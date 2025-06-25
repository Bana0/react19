import type { ColumnDef, Row } from '@tanstack/react-table'
import { flexRender, getCoreRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table'

import { useVirtualizer } from '@tanstack/react-virtual'
import type { Person } from './data'
import { useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'

interface BasicTableProps {
  data: Person[]
  columns: ColumnDef<Person>[]
  // tableContainerRef: RefObject<HTMLDivElement | null>
  isLoading: boolean
  isFetching: boolean
  // loadMore: (e: HTMLDivElement) => void
  className?: string
  setScrollTarget?: (e: HTMLElement) => void
  // sorting: SortingState
  // setSorting: (updater: OnChangeFn<SortingState>) => void
}

const BasicTableV2 = ({ data, columns, isLoading, isFetching, className, setScrollTarget }: BasicTableProps) => {
  const table = useReactTable({
    data: data,
    columns,
    state: {
      // sorting,
    },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    manualSorting: true,
    debugTable: true,
  })
  const tableContainerRef = useRef<HTMLElement | null>(null)

  table.setOptions((prev) => ({
    ...prev,
  }))

  const { rows } = table.getRowModel()

  const rowVirtualizer = useVirtualizer({
    count: rows.length,
    estimateSize: () => 33, //estimate row height for accurate scrollbar dragging
    getScrollElement: () => tableContainerRef.current,
    //measure dynamic row height, except in firefox because it measures table border height incorrectly
    measureElement: typeof window !== 'undefined' && navigator.userAgent.indexOf('Firefox') === -1 ? (element) => element?.getBoundingClientRect().height : undefined,
    overscan: 5,
  })

  useEffect(() => {
    const time = setTimeout(() => {
      if (tableContainerRef.current) {
        setScrollTarget?.(tableContainerRef.current)
      }
    }, 1000)

    return () => {
      clearTimeout(time)
      setScrollTarget?.(null as unknown as HTMLElement)
    }
  }, [setScrollTarget, tableContainerRef])

  if (isLoading) {
    return <>Loading...</>
  }
  return (
    <>
      <div ref={tableContainerRef as React.RefObject<HTMLDivElement>} className={cn('container relative overflow-auto', className)}>
        <table style={{ display: 'grid' }}>
          <thead
            style={{
              display: 'grid',
              position: 'sticky',
              top: 0,
              zIndex: 1,
            }}
          >
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} style={{ display: 'flex', width: '100%' }}>
                {headerGroup.headers.map((header) => {
                  return (
                    <th
                      key={header.id}
                      style={{
                        display: 'flex',
                        width: header.getSize(),
                      }}
                    >
                      <div
                        {...{
                          className: header.column.getCanSort() ? 'cursor-pointer select-none' : '',
                          onClick: header.column.getToggleSortingHandler(),
                        }}
                      >
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        {{
                          asc: ' 🔼',
                          desc: ' 🔽',
                        }[header.column.getIsSorted() as string] ?? null}
                      </div>
                    </th>
                  )
                })}
              </tr>
            ))}
          </thead>
          <tbody
            style={{
              display: 'grid',
              height: `${rowVirtualizer.getTotalSize()}px`, //tells scrollbar how big the table is
              position: 'relative', //needed for absolute positioning of rows
            }}
          >
            {rowVirtualizer.getVirtualItems().map((virtualRow) => {
              const row = rows[virtualRow.index] as Row<Person>
              return (
                <tr
                  data-index={virtualRow.index} //needed for dynamic row height measurement
                  ref={(node) => rowVirtualizer.measureElement(node)} //measure dynamic row height
                  key={row.id}
                  style={{
                    display: 'flex',
                    position: 'absolute',
                    transform: `translateY(${virtualRow.start}px)`, //this should always be a `style` as it changes on scroll
                    width: '100%',
                  }}
                >
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <td
                        key={cell.id}
                        style={{
                          display: 'flex',
                          width: cell.column.getSize(),
                        }}
                      >
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    )
                  })}
                </tr>
              )
            })}
          </tbody>
        </table>
        {isFetching && <div>Fetching More...</div>}
      </div>
    </>
  )
}
export default BasicTableV2
