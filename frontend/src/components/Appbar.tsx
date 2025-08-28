import { PlusCircle, User } from "lucide-react";
import { ModeToggle } from "./ui/darktoggle";
import { Button } from "./ui/button";



export function Appbar(){
    return(
        <div className="w-full flex border-2 items-center justify-between py-3 px-2 ">
            <div className="font-bold text-2xl">Manit Marketplace</div>
            <div className="flex items-center gap-5">
            <ModeToggle/>
            <User/>
            <Button variant={"default"}><PlusCircle/>Post Ad</Button>
            <Button>Login</Button>
            </div>
        </div>
    )
}