import axios from "axios";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth, googleProvider } from "../firebase/config";
import { Button } from "./ui/button";



export function Login(){
    const navigate = useNavigate();

    async function login(){
        await signInWithPopup(auth,googleProvider);
        const user=auth.currentUser
        if(!user){
            return;
        }
        const name=user.displayName
        const email=user.email;
        const id = email?.split("@")[0];
        if(!email?.endsWith("@stu.manit.ac.in")){
            alert("only manit account is authorized");
            return;
        }
        await axios.post("http://localhost:3000/api/v1/signin",{
            name,
            email,
            id
        })
        const token = await user.getIdToken();
        localStorage.setItem("token", token);
        navigate("/"); 
    }

    return(
        <Button variant={"default"} className="font-sans" onClick={login}>Login</Button>
    )
}