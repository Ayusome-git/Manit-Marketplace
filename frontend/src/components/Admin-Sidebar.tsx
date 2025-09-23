
import { Menu } from 'lucide-react'
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarHeader, SidebarTrigger } from './ui/sidebar'
import { Separator } from './ui/separator'
import { useAdminSectionStore } from '@/store/useAdminSections'

const Adminsidebar = () => {

  const { setSection, toggleSection } = useAdminSectionStore();

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
        <SidebarContent className='p-2'>
          <SidebarGroup>
            <h4 className='cursor-pointer'
              onClick={() => toggleSection("users")}>User Details</h4>
          </SidebarGroup>
          <SidebarGroup>
            <h4 className='cursor-pointer'
              onClick={() => toggleSection("products")}>Product Details</h4>
          </SidebarGroup>
          <SidebarGroup>
            <h4 className='cursor-pointer'
              onClick={() => toggleSection("notifications")}>Notifications</h4>
          </SidebarGroup>
        </SidebarContent >
        <SidebarFooter>footer</SidebarFooter>
      </Sidebar>
      <SidebarTrigger>
        <Menu className='h-5 w-5' />
      </SidebarTrigger>

    </>
  )
}

export default Adminsidebar