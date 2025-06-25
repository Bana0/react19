import { ColumnDef, flexRender, getCoreRowModel, getSortedRowModel, OnChangeFn, Row, SortingState, useReactTable } from '@tanstack/react-table'
import type { Person } from './data'

interface BasicTableProps {
  data: Person[]
  columns: ColumnDef<Person>[]
  tableContainerRef: HTMLDivElement | null
}

const BasicTableV2 = ({ data, columns, tableContainerRef }: BasicTableProps) => {
  return <div>BasicTableV2</div>
}
export default BasicTableV2
