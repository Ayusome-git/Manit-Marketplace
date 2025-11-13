import { create } from "zustand"
import axiosClient from "../config/axios-config"
import { useAuthStore } from "./useAuthStore"

export interface User {
  userId: string
  username: string
  email: string
  phoneNo: number
  hostelNo: number
}

// export interface Product {
//  productId: string
//  name: string
//  price: number
//  category: string
//  productCondition: string
//  description: string
//  viewCount: number
//  listedAt: Date
//  sellerId: string
// }

export interface ProductImage {
  imageId: string | number;
  productId: string;
  imageUrl: string;
}
export interface Seller {
  userId: string
  username: string
}
export interface Product {
  productId: string;
  name: string;
  description: string;
  category: string;
  price: number;
  productCondition: string;
  purchaseDate?: string;
  viewCount: number;
  sellerId: string
  productImages: ProductImage[];
  seller: Seller
}

type Section = "users" | "products" | "notifications" | null

interface AdminSectionState {
  openSection: Section | null
  setSection: (section: Section) => void
  toggleSection: (section: Section) => void

  users: User[]
  Products: Product[];
  product: Product | null

  isLoading: {
    users: boolean
    products: boolean
    notifications: boolean
  }
  error: string | null

  fetchUsers: () => Promise<void>
  fetchProducts: () => Promise<void>
  // fetchNotifications: () => Promise<void>
}

export const useAdminSectionStore = create<AdminSectionState>((set, get) => ({
  openSection: null,
  setSection: (section) => set({ openSection: section }),
  toggleSection: (section) => {
    set({
      openSection: get().openSection === section ? null : section,
    })
  },

  users: [],
  // products: [],
  Products: [],
  product: null,
  // featuredProducts: [],
  // RecentProducts: [],
  // MyProducts: [],

  isLoading: {
    users: false,
    products: false,
    notifications: false,
  },
  error: null,

  // fetchUsers: async () => {
  //  set(state => ({
  //   isLoading: { ...state.isLoading, users: true },
  //   error: null,
  //  }))
  //  console.log("fecthUsers")

  //  try {
  //   const res = await axiosClient.get("/admin/users")
  //   console.log("res",res)
  //   if (res.status !== 200) {
  //    throw new Error("Something went wrong in users data fetch!");
  //   }
  //   console.log("res.data", res.data)
  //   // @ts-ignore
  //   const users = res.data.users as User[]
  //   set(state => ({
  //    users,
  //    isLoading: { ...state.isLoading, users: false }
  //   }))
  //   console.log("users")
  //   console.log(users)

  //  } catch (error: any) {
  //   console.error("Error fetching users:", error)
  //   set({ error: error.message || "Failed to fetch users" })
  //  } finally {
  //   set(state => ({
  //    isLoading: { ...state.isLoading, users: false },
  //   }))
  //  }
  // },

  fetchUsers: async () => {
    set(state => ({
      isLoading: { ...state.isLoading, users: true },
      error: null,
    }));

    try {
      const { token } = useAuthStore.getState();
      if (!token) {
        throw new Error("Not authenticated");
      }
      const authHeader = token.startsWith("Bearer ") ? token : `Bearer ${token}`;

      const res = await axiosClient.get("/admin/users", {
        headers: { Authorization: authHeader },
      });
      if (res.status !== 200 || !res.data) throw new Error("Failed to fetch users");

      const users = (res.data ?? []) as User[];
      set(state => ({
        users,
        isLoading: { ...state.isLoading, users: false },
      }));
      console.log("fetched users:", users);
    } catch (err: any) {
      console.error("Error fetching users:", err);
      set(state => ({
        error: err.message || "Failed to fetch users",
        isLoading: { ...state.isLoading, users: false },
      }));
    }
  },

  fetchProducts: async () => {
    set(state =>
    ({
      isLoading: { ...state.isLoading, products: true },
      error: null
    }));
    try {
      const res = await axiosClient.get("/admin/all");
      if (res.status !== 200) {
        throw new Error("Something went wrong!");
      }
      const Products = res.data as Product[];
      set(state => ({ Products, isLoading: { ...state.isLoading, products: false } }));
    } catch (err: any) {
      set(state => ({
        error: err.message || "Failed to fetch products",
        isLoading: { ...state.isLoading, products: false }
      }));
    }
  },

  // fetchProducts: async () => {
  //  console.log("fetchProducts")
  //  set(state => ({
  //   isLoading: { ...state.isLoading, products: true },
  //   error: null
  //  }));
  //  try {
  //   const res = await axiosClient.get("/admin/products");
  //   console.log("products res.data ", res.data)
  //   if (res.status !== 200) {
  //    throw new Error("Something went wrong!");
  //   }
  //   const products = res.data as Product[];
  //   console.log(products)
  //   set(state => ({ products, isLoading: { ...state.isLoading, products: false } }));
  //  } catch (err: any) {
  //   console.log(err);
  //   set(state => ({
  //    error: err.message || "Failed to fetch products",
  //    isLoading: { ...state.isLoading, products: false }
  //   }));
  //  }
  // },

  // fetchProducts: async () => {
  //  set(state => ({
  //   isLoading: { ...state.isLoading, products: true },
  //   error: null,
  //  }))

  //  try {
  //   const res = await axiosClient.get("/admin/products")
  //   if (res.status !== 200) {
  //    throw new Error("Failed to fetch products");
  //   }
  //   const products = res.data as Product[]
  //   set(state => ({
  //    products,
  //    isLoading: { ...state.isLoading, products: true }
  //   }))

  //  } catch (error: any) {
  //   console.error("Error fetching products:", error)
  //   set({ error: error.message || "Failed to fetch products" })
  //  } finally {
  //   set(state => ({
  //    isLoading: { ...state.isLoading, products: false },
  //   }))
  //  }
  // },

  // fetchNotifications: async () => {
  //  set(state => ({
  //   isLoading: { ...state.isLoading, notifications: true },
  //   error: null,
  //  }))

  //  try {
  //   const res = await axiosClient.get("/admin/notifications")
  //   if(res.status!==200){
  //    throw new Error("Failed to fetch notifications")
  //   }
  //   const notification

  //  } catch (error: any) {
  //   console.error("Error fetching notifications:", error)
  //   set({ error: error.message || "Failed to fetch notifications" })
  //  } finally {
  //   set(state => ({
  //    isLoading: { ...state.isLoading, notifications: false },
  //   }))
  //  }
  // },

}))

export type { Section }