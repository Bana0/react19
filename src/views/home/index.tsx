import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useEffect } from 'react'
const getDate = () => {
  return axios.get('http://192.168.0.200:3010/model.json')
}

const Home = () => {
  const { data, isLoading, isError, error, isFetching, refetch } = useQuery({
    queryKey: ['getDate'],
    queryFn: () => getDate(),
    retry: 1, // 重连次数
    enabled: true, // 是否执行queryFn
    staleTime: 1000 * 60 * 5, // 缓存时间
  })

  useEffect(() => {}, [])
  return <div className="">Home</div>
}
export default Home
