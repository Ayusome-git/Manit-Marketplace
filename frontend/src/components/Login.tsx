import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../firebase/config";
import axiosClient from "../config/axios-config";
import { useAuthStore } from "../store/useAuthStore";
import { Button } from "./ui/button";

export function Login() {
  const navigate = useNavigate();
  const setUser = useAuthStore((state) => state.setUser);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function login() {
    if (loading) return;
    setLoading(true);
    setError(null);

    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      if (!user.email?.endsWith("@stu.manit.ac.in")) {
        setError("Only MANIT accounts are authorized");
        return;
      }

      const name = user.displayName!;
      const email = user.email!;
      const id = email.split("@")[0];


      await axiosClient.post("/user/signin", { name, email, id });

      const token = await user.getIdToken();
      setUser({ name, email, id }, token);

      navigate("/");
    } catch (err: any) {
      if (err.code === "auth/popup-closed-by-user") {
        setError("Login popup was closed by the user.");
      } else if (err.code === "auth/cancelled-popup-request") {
        setError("Login request was cancelled.");
      } else {
        setError(err.message || "Login failed");
      }
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center mt-20">
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <Button
        variant="default"
        className="font-sans"
        disabled={loading}
        onClick={login}
      >
        {loading ? "Logging in..." : "Login with MANIT Google"}
      </Button>
    </div>
  );
}
