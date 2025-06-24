// import LayOut from '@/layout/index.tsx';
import { lazy } from 'react'
import { Navigate } from 'react-router-dom'
const Home = lazy(() => import('@/views/home/index'))
const About = lazy(() => import('@/views/about/index'))
const Table = lazy(() => import('@/views/table/index'))
const Shadcn = lazy(() => import('@/views/shadcn/index'))
const routes = [
  {
    path: '/',
    // element: <LayOut />,
    children: [
      {
        path: '/',
        element: <Navigate to="/home"></Navigate>,
      },
      {
        path: '/home',
        element: <Home></Home>,
      },
      {
        path: '/about',
        element: <About></About>,
      },
      {
        path: '/table',
        element: <Table></Table>,
      },
      {
        path: '/shadcn',
        element: <Shadcn></Shadcn>,
      },
    ],
  },
  {
    path: '*',
    element: <div>404</div>,
  },
]
export default routes
