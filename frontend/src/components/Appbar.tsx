import { Heart, MessageCircle, PlusCircle, Sidebar, User } from "lucide-react";
import { ModeToggle } from "./ui/darktoggle";
import { Button } from "./ui/button";
import { Card } from "./ui/card";



export function Appbar(){
    return(
        <Card className="w-full flex flex-row border-none rounded-sm items-center justify-between py-3 px-2 font-sans fixed top-0">
            <div className="font-bold text-2xl">Manit Marketplace</div>
            <div className="flex items-center gap-5">
            <ModeToggle/>
            <User className="cursor-pointer hover:"/>
            <Heart/>
            <MessageCircle/>
            <Button variant={"default"}><PlusCircle/>Post Ad</Button>
            </div>
        </Card>
    )
}