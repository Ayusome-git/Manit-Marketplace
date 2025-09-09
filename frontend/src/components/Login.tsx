import { useState } from "react";
import axios from "axios";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth, googleProvider } from "../firebase/config";
import { Button } from "./ui/button";

export function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  async function login() {
    if (loading) return;
    setLoading(true);

    try {

      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user; 

      if (!user.email?.endsWith("@stu.manit.ac.in")) {
        alert("Only MANIT accounts are authorized");
        return;
      }

      const name = user.displayName;
      const email = user.email!;
      const id = email.split("@")[0];

      await axios.post("http://localhost:3000/user/signin", {
        name,
        email,
        id,
      });

      const token = await user.getIdToken();
      localStorage.setItem("token", token);

      navigate("/");
    } catch (error: any) {
      if (error.code === "auth/popup-closed-by-user") {
        console.warn("Login popup was closed by the user.");
      } else if (error.code === "auth/cancelled-popup-request") {
        console.warn("Login request was cancelled (possibly multiple attempts).");
      } else {
        console.error("Login failed:", error);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <Button
      variant="default"
      className="font-sans"
      disabled={loading}
      onClick={login}
    >
      {loading ? "Logging in..." : "Login"}
    </Button>
  );
}
