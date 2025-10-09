import axiosClient from "@/config/axios-config";
import { auth, googleProvider } from "@/firebase/config";
import { signInWithPopup } from "firebase/auth";
import { toast } from "sonner";
import { create } from "zustand";
import { persist } from "zustand/middleware";


export interface User{
    email: string;
    userId: string;
    username: string;
    phoneNo: string | null;
    hostelNo: number | null;
}
interface AuthState {
  user: User | null
  token: string | null;
  setUser: (user: AuthState["user"], token: string) => void;
  logout: () => void;
  login: ()=>void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
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
            alert("Only MANIT accounts are authorized");
            return;
          }

          let username = user.displayName!;
          const email = user.email!;
          const userId = email.split("@")[0];
          const hostelNo = null;
          const phoneNo = null;
          const token = await user.getIdToken();

          if (email === "marketplacemanit@gmail.com") {
            username = "admin";
          }
          localStorage.setItem("token",token)
          await axiosClient.post("/user/signin", { username, email, userId });

          set({ user: { username, email, userId, hostelNo, phoneNo }, token });
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
    }),
    {
      name: "auth-storage",
    }
  )
);