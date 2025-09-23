import { Route, Navigate } from "react-router-dom"
import AdminUserDetails from "@/components/Admin-UserDetails"
import AdminProductDetails from "@/components/Admin-ProductDetails"
import AdminNotification from "@/components/Admin-Notification"
import AdminHomePage from "@/pages/AdminHomePage"

export const AdminRoutes = (
  <Route path="/admin" element={<AdminHomePage />}>
    <Route index element={<Navigate to="/admin" replace />} />
    <Route path="userDetails" element={<AdminUserDetails />} />
    <Route path="productDetails" element={<AdminProductDetails />} />
    <Route path="notifications" element={<AdminNotification />} />
  </Route>
)