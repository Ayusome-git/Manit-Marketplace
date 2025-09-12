import { create } from "zustand";
import axiosClient from "../config/axios-config";

interface ProductImage {
  imageId: string | number;
  productId: string;
  imageUrl: string;
}

interface Product {
  productId: string;
  name: string;
  description: string;
  category: string;
  price: number;
  productCondition: string;
  purchaseDate?: string;
  productImages: ProductImage[];
}

interface ProductState {
  products: Product[];
  loading: boolean;
  error: string | null;

  fetchProducts: () => Promise<void>;
  addProduct: (data: FormData) => Promise<void>;
}

export const useProductStore = create<ProductState>((set) => ({
  products: [], // initialize as empty array
  loading: false,
  error: null,

  fetchProducts: async () => {
    set({ loading: true, error: null });
    try {
      const res = await axiosClient.get("/product/all");
      const data = res.data as { response: unknown };
      const productsArray = Array.isArray(data.response) ? data.response as Product[] : [];
      set({ products: productsArray, loading: false });
    } catch (err: any) {
      set({ error: err.message || "Failed to fetch products", loading: false });
    }
  },

  addProduct: async (formData) => {
    set({ loading: true, error: null });
    try {
      const res = await axiosClient.post("/product", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      const data = res.data as { response: Product };
      const newProduct = data.response;
      set((state) => ({
        products: [...state.products, newProduct],
        loading: false,
      }));
    } catch (err: any) {
      set({ error: err.message || "Failed to add product", loading: false });
    }
  },
}));
