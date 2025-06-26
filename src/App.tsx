import { Button } from '@/components/ui/button'
import useAppleStore from './store/useUserStore'
import { increment, decrement, doubleCount, getTotal } from './store/useUserStore'
import { shallow, useShallow } from 'zustand/shallow'
import { useEffect, useState } from 'react'
import { useNavigate, useRoutes } from 'react-router-dom'
import routes from './router'

const Chidlren1 = () => {
  const { price, count } = useAppleStore()
  console.log('--------Chidlren1--------')

  return (
    <div>
      <h1>Chidlren1</h1>
      <h6>单价：{price}</h6>
      <h6>数量：{count}</h6>
      <h6>金额：{getTotal()}</h6>
      <div className="flex gap-5">
        <Button onClick={increment}>+</Button>
        <Button onClick={decrement}>-</Button>
        <Button onClick={doubleCount}>*2</Button>
      </div>
    </div>
  )
}

const Chidlren2 = () => {
  const { price, color } = useAppleStore(
    useShallow((state) => ({
      price: state.price,
      color: state.color,
    }))
  )
  const [text, setText] = useState('')
  console.log('--------Chidlren2--------')
  useEffect(() => {
    const cancel = useAppleStore.subscribe(
      (state) => state.count,
      (state) => {
        setText(state > 15 ? '大于15' : '小于15')
      },
      {
        equalityFn: shallow, // 浅比较
        fireImmediately: true, // 立即触发
      }
    )
    return () => {
      cancel()
    }
  }, [])
  return (
    <div>
      <h1>Chidlren2</h1>
      <h6>单价：{price}</h6>
      <h6>颜色：{color}</h6>
      <h6>{text}</h6>
    </div>
  )
}

const App1 = () => {
  return (
    <div className="flex justify-center items-center flex-col h-screen w-screen">
      <div className="text-blue-600/100">App</div>
      <hr className="w-screen" />
      <Chidlren1></Chidlren1>
      <hr className="w-screen" />
      <Chidlren2></Chidlren2>
    </div>
  )
}
const App = () => {
  const navigator = useNavigate()
  return (
    <>
      {/* <div className="flex items-center justify-center gap-4">
        <Button onClick={() => navigator('/menus')}>menus</Button>
        <Button onClick={() => navigator('/home')}>Home</Button>
        <Button onClick={() => navigator('/about')}>About</Button>
        <Button onClick={() => navigator('/table')}>Table</Button>
        <Button onClick={() => navigator('/shadcn')}>Shadcn</Button>
        <Button onClick={() => navigator('/virtualTable')}>VirtualTable</Button>
      </div>
      <hr /> */}
      {/* <div className="container m-auto pt-0.5"> */}
      {useRoutes(routes)}
      {/* </div> */}
    </>
  )
}

export default App
