import type { Table } from '@tanstack/react-table'
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import type { Page } from '@/views/table'
import { useEffect } from 'react'

interface DataTablePaginationProps<TData> {
  table: Table<TData>
}

export function DataTablePagination<TData>({ table, page, onChangePage }: DataTablePaginationProps<TData> & { page: Page; onChangePage: (page: number, pageSize: number) => void }) {
  //   if (page) {
  //     table.setPageIndex(page.page - 1)
  //     table.setPageSize(page.pageSize)
  //   }
  useEffect(() => {
    table.setPageIndex(page.page - 1)
    table.setPageSize(page.pageSize)
    // 设置总条数
    // table.setRowCounts(page.total)
  }, [])
  const first = () => {
    table.setPageIndex(0)
    onChangePage(1, table.getState().pagination.pageSize)
  }
  const pre = () => {
    table.previousPage()
    onChangePage(table.getState().pagination.pageIndex + 1, table.getState().pagination.pageSize)
  }
  const next = () => {
    table.nextPage()
    onChangePage(table.getState().pagination.pageIndex + 1, table.getState().pagination.pageSize)
  }
  const last = () => {
    table.setPageIndex(table.getPageCount() - 1)
    onChangePage(table.getPageCount(), table.getState().pagination.pageSize)
  }
  return (
    <div className="flex items-center justify-between px-2">
      <div className="flex-1 text-sm text-muted-foreground">
        {table.getFilteredSelectedRowModel().rows.length} of {table.getFilteredRowModel().rows.length} row(s) selected.
      </div>
      <div className="flex items-center space-x-6 lg:space-x-8">
        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium">Rows per page</p>
          <Select
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={(value) => {
              //   console.log(value, 'sds')
              table.setPageSize(Number(value))
              onChangePage(Number(page.page), Number(value))
              //   onChangePage({...page, pageSize: Number(value) })
            }}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={table.getState().pagination.pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex w-[100px] items-center justify-center text-sm font-medium">
          Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" className="hidden h-8 w-8 p-0 lg:flex" onClick={first} disabled={!table.getCanPreviousPage()}>
            <span className="sr-only">Go to first page</span>
            <ChevronsLeft />
          </Button>
          <Button variant="outline" className="h-8 w-8 p-0" onClick={pre} disabled={!table.getCanPreviousPage()}>
            <span className="sr-only">Go to previous page</span>
            <ChevronLeft />
          </Button>
          <Button variant="outline" className="h-8 w-8 p-0" onClick={next} disabled={!table.getCanNextPage()}>
            <span className="sr-only">Go to next page</span>
            <ChevronRight />
          </Button>
          <Button variant="outline" className="hidden h-8 w-8 p-0 lg:flex" onClick={last} disabled={!table.getCanNextPage()}>
            <span className="sr-only">Go to last page</span>
            <ChevronsRight />
          </Button>
        </div>
      </div>
    </div>
  )
}
