import Adminsidebar from "@/components/Admin-Sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// import { useAdminSectionStore, type Section } from "@/store/useAdminSections";
import AdminUserDetails from "@/components/Admin-UserDetails";
import AdminProductDetails from "@/components/Admin-ProductDetails";
import AdminNotification from "@/components/Admin-Notification";
import AdminDashboard from "@/components/Admin-Dashboard";

import { useEffect, type JSX } from "react";
import { useAdminStore, type Section } from '@/store/useAdminStore'

import { useAuthStore } from "@/store/useAuthStore";

export default function AdminHomePage() {
 const { fetchProducts, Products, fetchUsers, users, isLoading, error, openSection, toggleSection } = useAdminStore()

 useEffect(() => {
  fetchProducts();
  fetchUsers();
 }, [fetchUsers, fetchProducts])

 // console.log("usersss", users)
 // console.log("Productsss", Products)

 const authUser = useAuthStore((s) => s.user)

 useEffect(() => {
  if (!authUser) {
   console.log("no authenticated user yet")
   return
  }
  else {
   console.log(authUser)
  }

  fetchProducts()
 }, [authUser, fetchProducts])

 if (isLoading.products || isLoading.users) {
  return <div>Loading...</div>;
 }

 if (error) {
  return <div>Error: {error}</div>;
 }

 // A small helper to render collapsible sections inline
 const renderSection = (title: string, sectionKey: Section, content: JSX.Element) => {
  const isOpen = openSection === sectionKey;

  return (
   <div className="border rounded-lg overflow-hidden">
    {/* Section Header */}
    <div className="flex justify-between items-center p-4 cursor-pointer bg-gray-400"
     onClick={() => toggleSection(sectionKey)}>
     <h3 className="font-semibold">{title}</h3>
     <motion.div
      onClick={(e) => {
       e.stopPropagation();
       toggleSection(sectionKey);
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
  );
 }

 return (
  <SidebarProvider className="w-[100%-16rem]">
   <div className="flex min-h-screen w-full">
    
    <Adminsidebar />

    <div className="flex-1 p-4">
     <div className="h-[400px] w-full p-4 border border-gray-300 mb-4">
      <AdminDashboard user_data={users} product_data={Products} />
     </div>

     {/* Sections */}
     <div className="space-y-4">
      {renderSection("User Details", "users", <AdminUserDetails user_data={users} />)}
      {renderSection("Product Details", "products", <AdminProductDetails product_data={Products?.products || []} />)}
      {/* <AdminNotification notification_data={[]} /> */}
     </div>
    </div>
   </div>
  </SidebarProvider>
 );
}