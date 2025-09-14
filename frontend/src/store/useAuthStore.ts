import axiosClient from "@/config/axios-config";
import { auth, googleProvider } from "@/firebase/config";
import { signInWithPopup } from "firebase/auth";
import { create } from "zustand";

interface AuthState {
  user: { name: string; email: string; id: string } | null;
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
  },
  login: async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      if (!user.email?.endsWith("@stu.manit.ac.in")) {
        alert("Only MANIT accounts are authorized");
        return;
      }

      const name = user.displayName!;
      const email = user.email!;
      const id = email.split("@")[0];

      await axiosClient.post("/user/signin", { name, email, id });

      const token = await user.getIdToken();
      set({ user: { name, email, id }, token });
      localStorage.setItem("token",token);
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
