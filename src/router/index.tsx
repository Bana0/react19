// import LayOut from '@/layout/index.tsx';
import { lazy } from 'react'
import { Navigate } from 'react-router-dom'
const Home = lazy(() => import('@/views/home/index'))
const Menu = lazy(() => import('@/views/menu/index'))
const About = lazy(() => import('@/views/about/index'))
const Table = lazy(() => import('@/views/table/index'))
const Shadcn = lazy(() => import('@/views/shadcn/index'))
const VirtualTable = lazy(() => import('@/views/virtualTable/index'))
const LayOut = lazy(() => import('@/layOut/index'))
const routes = [
  {
    path: '/',
    element: <LayOut />,
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
        path: '/menus',
        element: <Menu></Menu>,
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
      {
        path: '/virtualTable',
        element: <VirtualTable></VirtualTable>,
      },
    ],
  },
  {
    path: '*',
    element: <div>404</div>,
  },
]
export default routes
