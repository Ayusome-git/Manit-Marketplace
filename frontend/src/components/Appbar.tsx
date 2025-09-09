import { Heart, MessageCircle, PlusCircle, User } from "lucide-react";
import { ModeToggle } from "./ui/darktoggle";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { useNavigate, type Navigate } from "react-router-dom";



export function Appbar(){
    const nav= useNavigate();
    return(
        <Card className="w-full flex flex-row border-none rounded-sm items-center justify-between py-3 px-2 font-sans fixed top-0 mb-40 z-1">
            <div className="font-bold text-2xl">Manit Marketplace</div>
            <div className="flex items-center gap-5">
            <ModeToggle/>
            <User className="cursor-pointer hover:"/>
            <Heart/>
            <MessageCircle/>
            <Button onClick={()=>nav("/postad")} variant={"default"}><PlusCircle/>Post Ad</Button>
            </div>
        </Card>
    )
}