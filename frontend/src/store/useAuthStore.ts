import axiosClient from "@/config/axios-config";
import { auth, googleProvider } from "@/firebase/config";
import { signInWithPopup } from "firebase/auth";
import { toast } from "sonner";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product } from "./useProductStore";


export interface User{
    email: string;
    userId: string;
    username: string;
    phoneNo: string | null;
    hostelNo?: string | null;
    description?: string | null;
    profilePhoto?: string | null;

}
interface Seller{
  userId: string;
  email: string;
  phoneNo: string | null;
  username: string;
  hostelNo: string | null;
  description: string | null;
  profilePhoto: string | null;
  products: Product[];
}
interface AuthState {
  user: User | null
  token: string | null;
  loading?:boolean;
  seller?:Seller
  setUser: (user: AuthState["user"], token: string) => void;
  logout: () => void;
  login: () => Promise<void>;
  fetchUser: (id?: string) => Promise<void>;
  updateProfile: (payload: { hostelNo?: string | null; description?: string | null; file?: File | null }) => Promise<void>;
  viewSeller:(productId:string)=> Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      setUser: (user: User | null, token: string) => {
        set({ user, token });
      },
      logout: () => {
        localStorage.removeItem("token")
        set({ user: null, token: null });
        toast("You have Successfully Logged out!!")
      },
      login: async () => {
        try {
          const result = await signInWithPopup(auth, googleProvider);
          const user = result.user;
          console.log(user);

          if (!(user.email === "marketplacemanit@gmail.com") && !user.email?.endsWith("@stu.manit.ac.in")) {
            toast.error("Only MANIT accounts are authorized");
            return;
          }

          let username = user.displayName!;
          const email = user.email!;
          const userId = email.split("@")[0];
          const token = await user.getIdToken();

          if (email === "marketplacemanit@gmail.com") {
            username = "admin";
          }
          localStorage.setItem("token",token)
          await axiosClient.post("/user/signin", { username, email, userId });
          await get().fetchUser(userId);
          toast.success("Login Successfull");
        } catch (err: any) {
          if (err.code === "auth/popup-closed-by-user") {
            toast.error("Login popup was closed by the user.");
          } else if (err.code === "auth/cancelled-popup-request") {
            toast.error("Login request was cancelled.");
          } else {
            toast.error(err.message || "Login failed");
          }
          console.error(err);
        }
      },
      fetchUser: async (_id?: string) => {
        try {
          const resp = await axiosClient.get("/user/me");
          const userData = (resp?.data ?? null) as User | null;
          if (!userData) {
            set({ user: null });
            return;
          }

          set({ user: userData });
        } catch (err: any) {
          console.error("Failed to fetch user:", err);
          toast.error(err?.message || "Failed to fetch user");
        }
      },

    viewSeller:async (id:string) => {
    set({ loading: true});
    try {
      const res = await axiosClient.get(`/user/seller/${id}`);
      
      if(res.status!==200){
        throw new Error("Something went wrong!");
      }
      
      const seller = res.data as Seller;
      set({ seller, loading: false });
    } catch (err: any) {
      set({ loading: false });
    }
  },
      updateProfile: async ({ hostelNo, description, file }) => {
        try {
          const form = new FormData();
          if (hostelNo !== undefined && hostelNo !== null) form.append("hostelNo", hostelNo);
          if (description !== undefined && description !== null) form.append("description", description);
          if (file) form.append("profilePhoto", file);

          const resp = await axiosClient.put("/user", form, {
            headers: { "Content-Type": "multipart/form-data" },
          });

          const updatedUser = ((resp?.data) as any)?.user ?? null;
          if (updatedUser) {
            set({ user: updatedUser });
            toast.success("Profile updated");
          } else {
            toast.error("Failed to update profile");
          }
        } catch (err: any) {
          console.error("Failed to update profile:", err);
          toast.error(err?.message || "Failed to update profile");
        }
      },
    }),
    {
      name: "auth-storage",
    }
  )
);