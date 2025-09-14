import { create } from "zustand";
import axiosClient from "../config/axios-config";
import { Product } from "@/components/Product";

interface ProductImage {
  imageId: string | number;
  productId: string;
  imageUrl: string;
}
interface Seller{
  userId:string
  username:string
}
interface Product {
  productId: string;
  name: string;
  description: string;
  category: string;
  price: number;
  productCondition: string;
  purchaseDate?: string;
  viewCount:number;
  productImages: ProductImage[];
  seller:Seller
}
interface ProductState {
  products: Product[];
  featuredProducts: Product[];
  product:Product | null
  loading: boolean;
  error: string | null;

  fetchProducts: () => Promise<void>;
  addProduct: (data: FormData) => Promise<void>;
  fetchFeaturedProducts: ()=>Promise<void>;
  increaseCount: (id:string)=>Promise<void>;
  fetchProduct:(id:string)=>Promise<void>
}

export const useProductStore = create<ProductState>((set) => ({
  products: [],
  product:null,
  featuredProducts: [],
  loading: false,
  error: null,

  fetchProducts: async () => {
    set({ loading: true, error: null });
    try {
      const res = await axiosClient.get("/product/all");
      if(res.status!==200){
        throw new Error("Something went wrong!");
      }
      const productsArray = res.data as Product[];
      set({ products: productsArray, loading: false });
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

  addProduct: async (formData) => {
    set({ loading: true, error: null });
    try {
      const res = await axiosClient.post("/product", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      const data = res.data as { response: Product };
      console.log(data);
      const newProduct = data.response;
      set((state) => ({
        products: [...state.products, newProduct],
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
        products: state.products.map((p) =>
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
}));
