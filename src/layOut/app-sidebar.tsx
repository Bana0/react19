import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarProvider } from '@/components/ui/sidebar'
import { HomeIcon, Inbox, type LucideIcon } from 'lucide-react'
import Sider from './sider'
import { Button } from '@/components/ui/button'
import { useState, type ReactNode } from 'react'
import { Header } from './header'

export interface SidebarItem {
  title?: string
  icon?: LucideIcon
  href?: string
  url?: string
  children?: SidebarItem[]
}
const sidebars: SidebarItem[] = [
  {
    title: '系统首页',
    url: 'home',
    icon: HomeIcon,
  },
  {
    title: '客户管理',
    url: '#',
    icon: Inbox,
    children: [
      {
        title: '表格',
        url: 'table',
      },
      {
        title: '关于',
        url: 'about',
      },
      {
        title: 'shadcn',
        url: 'shadcn',
      },
      {
        title: 'virtualTable',
        url: 'virtualTable',
      },
    ],
  },
]
export function AppSidebar({ children }: { children: ReactNode }) {
  const [isShow, setIsShow] = useState(true)
  const toggle = () => {
    setIsShow(!isShow)
  }
  return (
    <SidebarProvider defaultOpen={isShow} open={isShow}>
      <div className="flex gap-6">
        <Sidebar side="left" variant="sidebar" collapsible="icon">
          <Header toggle={toggle} />
          {/* <SidebarHeader>
            <div className="h-[100px] bg-amber-300">
              <div>Header</div>
              <Button onClick={() => setIsShow(!isShow)}>{isShow ? '关闭' : '打开'}</Button>
            </div>
          </SidebarHeader> */}
          <SidebarContent>
            {sidebars.map((i, index) => {
              return <Sider sidebar={i} key={index} />
            })}
          </SidebarContent>
          <SidebarFooter>
            <div className="h-[100px] bg-amber-300 truncate">asdd</div>
          </SidebarFooter>
        </Sidebar>
        {children}
      </div>
    </SidebarProvider>
  )
}
