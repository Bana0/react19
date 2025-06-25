import BasicTableV2 from '@/components/basic-tableV2'
import { fetchData, type Person, type PersonApiResponse } from '@/components/basic-tableV2/data'
import { keepPreviousData, useInfiniteQuery } from '@tanstack/react-query'
import type { ColumnDef } from '@tanstack/react-table'
import { useCallback, useEffect, useMemo, useRef } from 'react'
import './index.scss'
const fetchSize = 50
const VirtualTable = () => {
  const columns = useMemo<ColumnDef<Person>[]>(
    () => [
      {
        accessorKey: 'id',
        header: 'ID',
        size: 60,
      },
      {
        accessorKey: 'firstName',
        cell: (info) => info.getValue(),
      },
      {
        accessorFn: (row) => row.lastName,
        id: 'lastName',
        cell: (info) => info.getValue(),
        header: () => <span>Last Name</span>,
      },
      {
        accessorKey: 'age',
        header: () => 'Age',
        size: 50,
      },
      {
        accessorKey: 'visits',
        header: () => <span>Visits</span>,
        size: 50,
      },
      {
        accessorKey: 'status',
        header: 'Status',
      },
      {
        accessorKey: 'progress',
        header: 'Profile Progress',
        size: 80,
      },
      {
        accessorKey: 'createdAt',
        header: 'Created At',
        cell: (info) => info.getValue<Date>().toLocaleString(),
        size: 200,
      },
    ],
    []
  )
  const { data, fetchNextPage, isFetching, isLoading } = useInfiniteQuery<PersonApiResponse>({
    queryKey: [
      'people',
      //   sorting, //refetch when sorting changes
    ],
    queryFn: async ({ pageParam = 0 }) => {
      const start = (pageParam as number) * fetchSize
      const fetchedData = await fetchData(start, fetchSize) //pretend api call
      return fetchedData
    },
    initialPageParam: 0,
    getNextPageParam: (_lastGroup, groups) => groups.length,
    refetchOnWindowFocus: false,
    placeholderData: keepPreviousData,
  })

  const flatData = useMemo(() => data?.pages?.flatMap((page) => page.data) ?? [], [data])
  const totalDBRowCount = data?.pages?.[0]?.meta?.totalRowCount ?? 0
  const totalFetched = flatData.length

  const fetchMoreOnBottomReached = useCallback(
    (containerRefElement?: HTMLDivElement | null) => {
      if (containerRefElement) {
        const { scrollHeight, scrollTop, clientHeight } = containerRefElement
        if (scrollHeight - scrollTop - clientHeight < 500 && !isFetching && totalFetched < totalDBRowCount) {
          fetchNextPage()
        }
      }
    },
    [fetchNextPage, isFetching, totalFetched, totalDBRowCount]
  )
  const tableContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    fetchMoreOnBottomReached(tableContainerRef.current)
  }, [fetchMoreOnBottomReached])

  return (
    <div className="ml-auto mr-auto flex flex-col items-center justify-center">
      <BasicTableV2 className="h-[400px] w-[500px] bg-amber-300" data={flatData} columns={columns} isLoading={isLoading} isFetching={isFetching} tableContainerRef={tableContainerRef} loadMore={fetchMoreOnBottomReached} />
    </div>
  )
}
export default VirtualTable
