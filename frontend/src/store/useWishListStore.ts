import { create } from "zustand";
import axiosClient from "@/config/axios-config";
import type { Product } from "./useProductStore";
 


export interface WishlistItem {
  wishlistId: number;
  userId: string;
  productId: string;
  product: Product;
}

interface WishlistState {
  wishlist: WishlistItem[];
  loading: boolean;
  error: string | null;

  fetchWishlist: (userId: string) => Promise<void>;
  addToWishlist: (userId: string, productId: string) => Promise<void>;
  removeFromWishlist: (wishlistId: number) => Promise<void>;
  isInWishlist: (productId: string) => boolean;
  getWishlistItemByProductId:(userId:string,productId:string)=> WishlistItem | undefined
}

export const useWishlistStore = create<WishlistState>((set, get) => ({
  wishlist: [],
  loading: false,
  error: null,

  fetchWishlist: async (userId) => {
    set({ loading: true, error: null });
    try {
      const res= await axiosClient.get<WishlistItem[]>(`/wishlist/${
        userId}`);
      if(res.status!==200){
        throw new Error("Something went wrong!");
      }
      const wishlist = res.data as WishlistItem[];
      set({ wishlist, loading: false });
    } catch (error) {
      set({ error: "Failed to fetch wishlist", loading: false });
    }
  },

  addToWishlist: async (userId, productId) => {
    try {
      const response = await axiosClient.post<WishlistItem>("/wishlist", {
        userId,
        productId,
      });
      if(response.status!==200){
        throw new Error("Something went wrong!");
      }
      await get().fetchWishlist(userId);
    } catch (error) {
      set({ error: "Failed to add to wishlist" });
    }
  },

  removeFromWishlist: async (wishlistId) => {
    try {
      const response=await axiosClient.delete(`/wishlist/${wishlistId}`);
      if(response.status!==200){
        throw new Error("Something went wrong!");
      }
      set({
        wishlist: get().wishlist.filter((item) => item.wishlistId !== wishlistId),
      });
    } catch (error) {
      set({ error: "Failed to remove from wishlist" });
    }
  },

  // Check if product is already wishlisted
  isInWishlist: (productId) => {
    return get().wishlist.some((item) => item.productId === productId);
  },
  getWishlistItemByProductId: (userId:string,productId: string) => {
  return get().wishlist.find((item) => item.productId === productId && item.userId===userId);
},
}));
