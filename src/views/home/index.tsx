import { AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { AlertDialog, AlertDialogAction, AlertDialogCancel } from '@radix-ui/react-alert-dialog'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useEffect } from 'react'
const getDate = () => {
  return axios.get('http://192.168.0.200:3010/model.json')
}

const Home = () => {
  /*  const { data, isLoading, isError, error, isFetching, refetch } = useQuery({
    queryKey: ['getDate'],
    queryFn: () => getDate(),
    retry: 1, // 重连次数
    enabled: true, // 是否执行queryFn
    staleTime: 1000 * 60 * 5, // 缓存时间
  })

  useEffect(() => {}, []) */
  return (
    <div className="">
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button>Open</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>This action cannot be undone. This will permanently delete your account and remove your data from our servers.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
export default Home
