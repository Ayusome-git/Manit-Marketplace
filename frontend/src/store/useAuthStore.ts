import axiosClient from "@/config/axios-config";
import { auth, googleProvider } from "@/firebase/config";
import { signInWithPopup } from "firebase/auth";
import { create } from "zustand";


interface User{
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

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  setUser: (user, token) => {
    localStorage.setItem("token", token);
    set({ user, token });
  },
  logout: () => {
    localStorage.removeItem("token");
    set({ user: null, token: null });
    alert("you have logged out!!!")
  },
  login: async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      if (!user.email?.endsWith("@stu.manit.ac.in")) {
        alert("Only MANIT accounts are authorized");
        return;
      }
      const username = user.displayName!;
      const email = user.email!;
      const userId = email.split("@")[0];
      const hostelNo=null
      const phoneNo=null
      const token = await user.getIdToken();
      localStorage.setItem("token",token);
      await axiosClient.post("/user/signin", { username, email, userId });
      set({ user: { username, email, userId,hostelNo,phoneNo }, token });
    } catch (err: any) {
      if (err.code === "auth/popup-closed-by-user") {
        alert("Login popup was closed by the user.");
      } else if (err.code === "auth/cancelled-popup-request") {
        alert("Login request was cancelled.");
      } else {
        alert(err.message || "Login failed");
      }
      console.error(err);
    }
  }
}));
