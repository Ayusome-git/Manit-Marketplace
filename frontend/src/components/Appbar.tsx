import { Heart, MessageCircle, PlusCircle, User, Menu } from "lucide-react";
import { ModeToggle } from "./ui/darktoggle";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { useNavigate } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import { motion } from "framer-motion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu"
import { useAuthStore } from "@/store/useAuthStore";

export function Appbar() {
  const nav = useNavigate();
  const isMobile = useIsMobile();
  const {user, logout,login} =useAuthStore()

  const menuItems = [
    { label: "Profile", icon: <User className="h-5 w-5" />, path: "/profile" },
    { label: "Wishlist", icon: <Heart className="h-5 w-5" />, path: "/wishlist" },
    { label: "Messages", icon: <MessageCircle className="h-5 w-5" />, path: "/messages" },
  ];

  return (
    <>
      {isMobile ? (
        <Card className="w-full flex flex-row items-center justify-between border-none py-3 px-4 font-sans fixed top-0 z-50 shadow-md mb-10">
          <div className="font-bold text-xl">Manit Marketplace</div>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="top"
              className="p-6 flex flex-col gap-6 bg-background/95 backdrop-blur-md"
            >
              {/* Animated wrapper */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.25 }}
                className="flex flex-col gap-5"
              >
                <div className="flex justify-center items-center gap-2 text-sm ">
                  <ModeToggle />
                  <span>Toggle Theme</span>
                </div>

                {menuItems.map((item, idx) => (
                  <SheetClose asChild key={idx}>
                    <Button
                      variant="ghost"
                      className="flex items-center gap-3 text-lg justify-center hover:bg-muted/60"
                      onClick={() => nav(item.path)}
                    >
                      {item.icon} {item.label}
                    </Button>
                  </SheetClose>
                ))}

                <div className="flex justify-center">
                  <SheetClose asChild>
                    <Button
                      className="flex items-center gap-2 w-fit shadow-md"
                      onClick={() => nav("/postad")}
                    >
                      <PlusCircle className="h-5 w-5" /> Post Ad
                    </Button>
                  </SheetClose>
                </div>
              </motion.div>
            </SheetContent>
          </Sheet>
        </Card>
      ) : (
        <Card className="w-full flex flex-row border-none items-center rounded-none justify-between py-3 px-6 font-sans fixed top-0 z-50 shadow-md ">
          <div className="font-bold text-2xl hover:text-primary transition-colors cursor-pointer" onClick={()=>nav("/")}>Manit Marketplace</div>
          <div className="flex items-center gap-5">
            <ModeToggle />
            <DropdownMenu>
              <DropdownMenuTrigger>
              <User
              className="cursor-pointer hover:text-primary transition-colors hover:fill-primary"/>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={()=>nav("/profile")}>{user?.name}</DropdownMenuItem>
                {(user!=null)?(<DropdownMenuItem className="text-red-500" onClick={logout}>Logout</DropdownMenuItem>):
                (<DropdownMenuItem onClick={login}>Login</DropdownMenuItem>)}
              </DropdownMenuContent>
            </DropdownMenu>
            <Heart
              className="cursor-pointer hover:text-primary transition-colors hover:fill-primary"
              onClick={() => nav("/wishlist")}
            />
            <MessageCircle
              className="cursor-pointer hover:text-primary transition-colors hover:fill-primary"
              onClick={() => nav("/messages")}
            />
            <Button onClick={() => nav("/postad")} variant="default">
              <PlusCircle className="mr-1 h-5 w-5" /> Post Ad
            </Button>
          </div>
        </Card>
      )}
    </>
  );
}
