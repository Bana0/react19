import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@radix-ui/react-collapsible'
import type { SidebarItem } from './app-sidebar'
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarMenuSub, SidebarMenuSubButton, SidebarMenuSubItem } from '@/components/ui/sidebar'
import { ChevronRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const Sider = ({ sidebar }: { sidebar: SidebarItem }) => {
  const navigate = useNavigate()
  const jumpTo = (item: SidebarItem) => () => {
    navigate('/' + item.url)
  }
  if (!sidebar.children)
    return (
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton tooltip={sidebar.title} onClick={jumpTo(sidebar)}>
            {sidebar.icon && <sidebar.icon />}
            <span>{sidebar.title}</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    )
  return (
    <Collapsible defaultOpen={false} className="group/collapsible">
      <SidebarMenu>
        <SidebarMenuItem>
          <CollapsibleTrigger asChild>
            <SidebarMenuButton tooltip={sidebar.title}>
              {sidebar.icon && <sidebar.icon />}
              <span>{sidebar.title}</span>
              <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
            </SidebarMenuButton>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <SidebarMenuSub>
              {sidebar.children?.map((i) => {
                return (
                  <SidebarMenuSubItem key={i.title}>
                    <a>
                      <SidebarMenuSubButton asChild onClick={jumpTo(i)}>
                        {/* {i.icon && <i.icon />} */}
                        <span>{i.title}</span>
                      </SidebarMenuSubButton>
                    </a>
                  </SidebarMenuSubItem>
                )
              })}
            </SidebarMenuSub>
          </CollapsibleContent>
        </SidebarMenuItem>
      </SidebarMenu>
    </Collapsible>
  )
}
export default Sider
