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
  const table = useReactTable({
    data,
    columns,
    state: {
      columnPinning: {
        left: ['id'], // 左侧固定的列 ID
        right: [], // 右侧固定的列 ID
      },
    },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  })

  return (
    <div className="rounded-md border w-[800px]">
      <ScrollArea className="h-[400px] w-[800px] overflow-auto">
        <Table>
          <TableHeader className="sticky top-0 left-0 right-0 bg-amber-200 shadow-sm">
            {/* 渲染左侧固定列的表头 */}
            {table.getLeftHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    style={{
                      position: 'sticky',
                      left: 0, // 多列时需累加前面所有固定列宽度
                      zIndex: 3,
                      background: '#fff',
                    }}
                  >
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
            {/* 渲染中间列的表头 */}
            {table.getCenterHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>{flexRender(header.column.columnDef.header, header.getContext())}</TableHead>
                ))}
              </TableRow>
            ))}
            {/* 渲染右侧固定列的表头 */}
            {table.getRightHeaderGroups()?.map((headerGroup) => (
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
                  {/* 渲染左侧固定列的单元格 */}
                  {row.getLeftVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      style={{
                        position: 'sticky',
                        left: 0, // 多列时需累加前面所有固定列宽度
                        zIndex: 2,
                        background: '#fff',
                      }}
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                  {/* 渲染中间列的单元格 */}
                  {row.getCenterVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                  {/* 渲染右侧固定列的单元格 */}
                  {row.getRightVisibleCells().map((cell) => (
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
