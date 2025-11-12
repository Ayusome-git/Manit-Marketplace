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
    hostelNo?: string | null;
    description?: string | null;
    profilePhoto?: string | null;

}
interface AuthState {
  user: User | null
  token: string | null;
  setUser: (user: AuthState["user"], token: string) => void;
  logout: () => void;
  login: () => Promise<void>;
  // fetchUser will fetch the currently authenticated user's profile from the server.
  // If `id` is provided it will be ignored because the backend exposes `/user/me` which
  // reads identity from the auth middleware (token).
  fetchUser: (id?: string) => Promise<void>;
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

          // if (!(user.email === "marketplacemanit@gmail.com") && !user.email?.endsWith("@stu.manit.ac.in")) {
          //   alert("Only MANIT accounts are authorized");
          //   return;
          // }

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
    }),
    {
      name: "auth-storage",
    }
  )
);