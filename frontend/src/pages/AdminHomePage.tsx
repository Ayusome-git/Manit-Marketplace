import Adminsidebar from "@/components/Admin-Sidebar"
import { SidebarProvider } from "@/components/ui/sidebar"
import { useAdminSectionStore, type Section } from "@/store/useAdminSections"
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import AdminUserDetails from "@/components/Admin-UserDetails";
import AdminProductDetails from "@/components/Admin-ProductDetails";
import AdminNotification from "@/components/Admin-Notification";
import type { JSX } from "react";

export default function AdminHomePage() {

  const { openSection, toggleSection } = useAdminSectionStore();

  // A small helper to render collapsible sections inline
  const renderSection = (title: string, sectionKey: Section, content: JSX.Element) => {
    const isOpen = openSection === sectionKey

    return (
      <div className="border rounded-lg overflow-hidden">
        {/* Section Header */}
        <div className="flex justify-between items-center p-4 cursor-pointer bg-gray-400"
          onClick={() => toggleSection(sectionKey)}>
          <h3 className="font-semibold">{title}</h3>
          <motion.div
            onClick={(e) => {
              e.stopPropagation()
              toggleSection(sectionKey)
            }}
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}>
            <ChevronDown />
          </motion.div>
        </div>

        {/* Animated Content */}
        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              key="content"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="p-4">{content}</div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    )
  }

  return (
    <SidebarProvider className="w-[100%-16rem]">
      <div className="flex min-h-screen w-full">
        <Adminsidebar />

        <div className="flex-1 p-4">
          {/* Dashboard (default view when no section is open) */}
          {!openSection ? (
            <div className="h-[300px] w-full p-4 border border-yellow-300 mb-4">
              dashboard summary
            </div>
          ) : (
            <>
              <div className="h-[300px] w-full p-4 border border-yellow-300 mb-4">

              </div>
            </>
          )}

          {/* Sections */}
          <div className="space-y-4">
            {renderSection("User Details", "users", <AdminUserDetails />)}
            {renderSection("Product Details", "products", <AdminProductDetails />)}
            {renderSection("Notifications", "notifications", <AdminNotification />)}
          </div>
        </div>
      </div>
    </SidebarProvider>
    // <SidebarProvider className="w-[100%-16rem]">
    //   <div className="flex min-h-screen w-full">
    //     <Adminsidebar />

    //     <div className="flex-1 p-4">
    //       <div className="h-[300px] w-full p-4 border border-yellow-300 mb-4">
    //         dashboard
    //       </div>

    //       {/* User Details */}
    //       <div className="border border-gray-400 space-y-4">

    //         {openSection === "users" ? (
    //           <div className="border rounded-lg">
    //             <div className="flex justify-between items-center p-4 cursor-pointer bg-gray-400"
    //               onClick={() => toggleSection("users")}>
    //               <h3 className="font-semibold">User Details</h3>
    //               <ChevronDown />
    //             </div>
    //             <div className="p-4">
    //               <AdminUserDetails />
    //             </div>
    //           </div>
    //         ) : (
    //           <>
    //             <div className="border rounded-lg">
    //               <div className="flex justify-between items-center p-4 cursor-pointer bg-gray-400"
    //                 onClick={() => toggleSection("users")}>
    //                 <h3 className="font-semibold">User Details</h3>
    //                 <ChevronDown />
    //               </div>
    //             </div>
    //           </>
    //         )}

    //         {/* Products */}
    //         {openSection === "products" ? (
    //           <div className="border rounded-lg">
    //             <div className="flex justify-between items-center p-4 cursor-pointer bg-gray-400"
    //               onClick={() => toggleSection("products")}>
    //               <h3 className="font-semibold">Product Details</h3>
    //               <ChevronDown />
    //             </div>
    //             <div className="p-4">
    //               <AdminProductDetails />
    //             </div>
    //           </div>
    //         ) : (
    //           <>
    //             <div className="border rounded-lg">
    //               <div className="flex justify-between items-center p-4 cursor-pointer bg-gray-400"
    //                 onClick={() => toggleSection("products")}>
    //                 <h3 className="font-semibold">Product Details</h3>
    //                 <ChevronDown />
    //               </div>
    //             </div>
    //           </>
    //         )}

    //         {/* Notifications */}
    //         {openSection === "notifications" ? (
    //           <div className="border rounded-lg">
    //             <div className="flex justify-between items-center p-4 cursor-pointer bg-gray-400"
    //               onClick={() => toggleSection("notifications")}>
    //               <h3 className="font-semibold">Notifications</h3>
    //               <ChevronDown />
    //             </div>
    //             <div className="p-4">
    //               <AdminNotification />
    //             </div>
    //           </div>
    //         ) : (
    //           <>
    //             <div className="border rounded-lg">
    //               <div className="flex justify-between items-center p-4 cursor-pointer bg-gray-400"
    //                 onClick={() => toggleSection("notifications")}>
    //                 <h3 className="font-semibold">Notifications</h3>
    //                 <ChevronDown />
    //               </div>
    //             </div>
    //           </>
    //         )}

    //       </div>
    //     </div>
    //   </div>
    // </SidebarProvider >
  )
}
