import { columns, type Payment } from '@/components/basic-table/columns'
import { DataTable } from '@/components/basic-table/data-table'
import { useEffect, useState } from 'react'

export interface Page {
  page: number
  pageSize: number
  total: number
}

const getData = async (page: Page) => {
  const data = new Array(100).fill(0).map((_, index) => ({
    id: `${index}`,
    amount: `${index + 1}`,
    status: 'pending',
    email: 'm@example.com',
  }))
  return {
    total: data.length,
    data: data.slice((page.page - 1) * page.pageSize, page.page * page.pageSize),
  }
}

const Table = () => {
  const [data, setData] = useState<Payment[]>([])
  const [page, setPage] = useState<Page>({
    page: 1,
    pageSize: 10,
    total: 0,
  })

  // Fetch data
  useEffect(() => {
    handleData()
  }, [page.pageSize, page.page])

  const handleData = async () => {
    const res = await getData(page)
    setData(res.data)
    setPage((prev) => ({ ...prev, total: res.total }))
  }

  const onChangePage = async (page1: number, pageSize: number) => {
    setPage((prev) => ({ ...prev, page: page1, pageSize: pageSize }))
  }

  return (
    <div className="container mx-auto py-10">
      <div className="mx-auto">
        <DataTable columns={columns} data={data} page={page} onChangePage={onChangePage} />
      </div>
    </div>
  )
}
export default Table
