import { create } from "zustand";
import axiosClient from "../config/axios-config";
import { Product } from "@/components/Product";

export interface User {
  userId: string
  username: string
  email: string
  phoneNo: number
  hostelNo: number
}

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

interface AdminState {
  openSection: Section | null
  setSection: (section: Section) => void
  toggleSection: (section: Section) => void

  users: User[]

  Products: Product[];
  product: Product | null;

  isLoading: {
    users: boolean
    products: boolean
    notifications: boolean
  }
  error: string | null


  fetchProducts: () => Promise<void>;
  fetchUsers: () => Promise<void>;
}

export const useAdminStore = create<AdminState>((set, get) => ({

  openSection: null,
  setSection: (section) => set({ openSection: section }),
  toggleSection: (section) => {
    set({
      openSection: get().openSection === section ? null : section,
    })
  },

  isLoading: {
    users: false,
    products: false,
    notifications: false,
  },
  error: null,

  users: [],

  Products: [],
  product: null,

  // fetchUsers
  fetchUsers: async () => {
    set(state => ({
      isLoading: { ...state.isLoading, users: true },
      error: null,
    }))
    console.log("fecthUsers")

    try {
      const res = await axiosClient.get("/admin/users")
      console.log("res", res)
      if (res.status !== 200) {
        throw new Error("Something went wrong in users data fetch!");
      }
      console.log("res.data", res.data)
      // @ts-ignore
      const users = res.data.users as User[]
      set(state => ({
        users,
        isLoading: { ...state.isLoading, users: false }
      }))
      console.log("users")
      console.log(users)

    } catch (error: any) {
      console.error("Error fetching users:", error)
      set({ error: error.message || "Failed to fetch users" })
    } finally {
      set(state => ({
        isLoading: { ...state.isLoading, users: false },
      }))
    }
  },


  //fetch products
  fetchProducts: async () => {
    set(state => ({
      isLoading: { ...state.isLoading, products: true },
      error: null
    }));
    try {
      const res = await axiosClient.get("/admin/products");
      if (res.status !== 200) {
        throw new Error("Something went wrong!");
      }
      const Products = res.data as Product[];
      set(state => ({
        Products,
        isLoading: { ...state.isLoading, products: false }
      }));
    } catch (err: any) {
      set(state => ({
        error: err.message || "Failed to fetch products",
        isLoading: { ...state.isLoading, products: false }
      }));
    }
  },

})
)


export type { Section }