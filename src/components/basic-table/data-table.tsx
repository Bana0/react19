'use client'

import type { ColumnDef, ColumnPinningState, RowPinningState } from '@tanstack/react-table'
import { flexRender, getCoreRowModel, useReactTable, getPaginationRowModel } from '@tanstack/react-table'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { DataTablePagination } from './page'
import type { Page } from '@/views/table'
import { useState } from 'react'
import { ScrollArea } from '@radix-ui/react-scroll-area'

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function DataTable<TData, TValue>({ columns, data, page, onChangePage }: DataTableProps<TData, TValue> & { page: Page; onChangePage: (page: number, pageSize: number) => void }) {
  const [columnPinning, setColumnPinning] = useState<ColumnPinningState>({
    left: [],
    right: [],
  })
  const [rowPinning, setRowPinning] = useState<RowPinningState>({
    top: [],
    bottom: [],
  })
  const [keepPinnedRows, setKeepPinnedRows] = useState(true)
  const table = useReactTable({
    data,
    columns,
    state: {
      columnPinning,
      rowPinning,
    },
    initialState: {
      columnPinning: {
        left: ['id'],
        // right: ['actions-column'],
      },
    },
    onColumnPinningChange: setColumnPinning,
    onRowPinningChange: setRowPinning,
    keepPinnedRows,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  })

  return (
    <div className="rounded-md border w-[800px]">
      <ScrollArea className="h-[400px] w-[800px] overflow-auto">
        <Table>
          <TableHeader className="sticky top-0 left-0 right-0 bg-amber-200 shadow-sm">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>{flexRender(header.column.columnDef.header, header.getContext())}</TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </ScrollArea>
      <DataTablePagination table={table} page={page} onChangePage={onChangePage} />
    </div>
  )
}
