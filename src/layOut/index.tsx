import { Outlet } from 'react-router-dom'
import { AppSidebar } from './app-sidebar'

const LoyOut = () => {
  return (
    <AppSidebar>
      <Outlet />
    </AppSidebar>
  )
}
export default LoyOut
