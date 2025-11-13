import { Menu } from 'lucide-react'
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarHeader, SidebarRail, SidebarTrigger } from './ui/sidebar'
import { Separator } from './ui/separator'
import { useAdminStore } from '@/store/useAdminStore'
import { NavUser } from './nav-user'

const Adminsidebar = () => {

  const { setSection, toggleSection } = useAdminStore();

  // const user = {
  //   name: "Utkarsh",
  //   email: "utk123@stu.manit.in",
  //   // avatar: "vite.svg"
  // }

  return (
    <>

      <Sidebar>
        <SidebarHeader className='flex justify-center items-center'>
          <h2 className='p-2 mb-2 mt-2 cursor-pointer'
            onClick={() => setSection(null)}>
            Manit Marketplace
          </h2>
        </SidebarHeader>
        <Separator className='bg-gray-500' />
        <SidebarContent className='p-4'>
          <SidebarGroup>
            <h4 className='cursor-pointer'
              onClick={() => toggleSection("users")}>User Details</h4>
          </SidebarGroup>
          <Separator className='bg-gray-500' />
          <SidebarGroup>
            <h4 className='cursor-pointer'
              onClick={() => toggleSection("products")}>Product Details</h4>
          </SidebarGroup>
          <Separator className='bg-gray-500' />
          {/* <SidebarGroup>
            <h4 className='cursor-pointer'
              onClick={() => toggleSection("notifications")}>Notifications</h4>
          </SidebarGroup>
          <Separator className='bg-gray-500' /> */}
        </SidebarContent >
        <SidebarFooter>
          {/* <NavUser user={user} /> */}
        </SidebarFooter>
        <SidebarRail/>
      </Sidebar>
      <SidebarTrigger>
        <Menu className='h-5 w-5' />
      </SidebarTrigger>

    </>
  )
}

export default Adminsidebar