import { create } from "zustand";
import axiosClient from "../config/axios-config";
import { Product } from "@/components/Product";

export interface ProductImage {
  imageId: string | number;
  productId: string;
  imageUrl: string;
}
export interface Seller{
  userId:string
  username:string
}
export interface Product {
  productId: string;
  name: string;
  description: string;
  category: string;
  price: number;
  productCondition: string;
  purchaseDate?: string;
  viewCount:number;
  sellerId:string
  productImages: ProductImage[];
  seller:Seller
}
interface ProductState {
  Products: Product[];
  featuredProducts: Product[];
  MyProducts: Product[];
  RecentProducts:Product[];
  product:Product | null
  loading: boolean;
  error: string | null;

  fetchProducts: () => Promise<void>;
  addProduct: (data: FormData) => Promise<void>;
  fetchFeaturedProducts: ()=>Promise<void>;
  fetchRecentProducts:()=>Promise<void>;
  increaseCount: (id:string)=>Promise<void>;
  fetchProduct:(id:string)=>Promise<void>
  fetchMyProducts:()=>Promise<void>
  deleteProduct:(productId:string)=>Promise<void>
}

export const useProductStore = create<ProductState>((set,get) => ({
  Products: [],
  product:null,
  featuredProducts: [],
  RecentProducts:[],
  MyProducts:[],
  loading: false,
  error: null,

  fetchProducts: async () => {
    set({ loading: true, error: null });
    try {
      const res = await axiosClient.get("/product/all");
      if(res.status!==200){
        throw new Error("Something went wrong!");
      }
      const Products = res.data as Product[];
      set({ Products, loading: false });
    } catch (err: any) {
      set({ error: err.message || "Failed to fetch products", loading: false });
    }
  },

  fetchFeaturedProducts: async () => {
    set({ loading: true, error: null });
    try {
      const res = await axiosClient.get("/product/featured");
      
      if(res.status!==200){
        throw new Error("Something went wrong!");
      }
      
      const featuredProducts = res.data as Product[];
      set({ featuredProducts, loading: false });
    } catch (err: any) {
      set({ error: err.message || "Failed to fetch featured products", loading: false });
    }
  },
  fetchProduct:async(id:string)=>{
    set({ loading: true, error: null });
    try {
      const res = await axiosClient.get(`/product/${id}`);
      if(res.status!==200){
        throw new Error("Something went wrong!");
      }
      
      const product = res.data as Product;
      set({ product, loading: false });
      
    } catch (err: any) {
      set({ error: err.message || "Failed to fetch featured products", loading: false });
    }
  },
  fetchMyProducts: async () => {
    set({ loading: true, error: null });
    try {
      const res = await axiosClient.get("/product/myads");
      
      if(res.status!==200){
        throw new Error("Something went wrong!");
      }
      
      const MyProducts = res.data as Product[];
      set({ MyProducts, loading: false });
    } catch (err: any) {
      set({ error: err.message || "Failed to fetch featured products", loading: false });
    }
  },
   fetchRecentProducts: async () => {
    set({ loading: true, error: null });
    try {
      const res = await axiosClient.get("/product/recent");
      
      if(res.status!==200){
        throw new Error("Something went wrong!");
      }
      
      const RecentProducts = res.data as Product[];
      set({ RecentProducts, loading: false });
    } catch (err: any) {
      set({ error: err.message || "Failed to fetch featured products", loading: false });
    }
  },
  
  addProduct: async (formData) => {
    set({ loading: true, error: null });
    try {
      const res = await axiosClient.post("/product", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if(res.status!==200){
        alert("failed to post ad")
        throw new Error("Something went wrong!");
      }
      const data = res.data as { response: Product };
      const newProduct = data.response;
      set((state) => ({
        products: [...state.Products, newProduct],
        loading: false,
      }));
    } catch (err: any) {
      set({ error: err.message || "Failed to add product", loading: false });
    }
  },
  increaseCount: async (id: string) => {
    try {
      await axiosClient.post(`/product/${id}/viewCount`);
      set((state) => ({
        products: state.Products.map((p) =>
          p.productId === id ? { ...p, viewCount: p.viewCount + 1 } : p
        ),
        featuredProducts: state.featuredProducts.map((p) =>
          p.productId === id ? { ...p, viewCount: p.viewCount + 1 } : p
        ),
        loading: false,
      }));
    } catch (err: any) {
      console.error("Failed to increase product view count", err);
    }
  },
  deleteProduct: async (productId) => {
    try {
      const response=await axiosClient.delete(`/product/${productId}`);
      if(response.status===401){
        throw new Error("Unauthorized")
      }
      if(response.status!==200){
        throw new Error("Something went wrong!");
      }
      set({
        Products: get().Products.filter((item)=>item.productId!==productId)
      });
      set({
        MyProducts: get().MyProducts.filter((item)=>item.productId!==productId)
      });
      set({
        featuredProducts: get().featuredProducts.filter((item)=>item.productId!==productId)
      });
      set({
        RecentProducts: get().RecentProducts.filter((item)=>item.productId!==productId)
      });
    } catch (error) {
      set({ error: "Failed to remove from wishlist" });
    }
  },
}));
