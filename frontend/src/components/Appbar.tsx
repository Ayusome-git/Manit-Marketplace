import { Heart, MessageCircle, PlusCircle, User, Menu, Bell } from "lucide-react";
import { ModeToggle } from "./ui/darktoggle";
import { Button } from "./ui/button";

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
import { SearchBar } from "./SearchBar";

export function Appbar() {
  const nav = useNavigate();
  const isMobile = useIsMobile();
  const { user, logout, login } = useAuthStore();

  const menuItems = [
    { label: "Profile", icon: <User className="h-5 w-5" />, path: "/profile/myprofile" },
    { label: "Wishlist", icon: <Heart className="h-5 w-5" />, path: "/profile/wishlist" },
    { label: "Messages", icon: <MessageCircle className="h-5 w-5" />, path: "/profile/chat" },
  ];

  return (
    <>
      {isMobile ? (
        <header className="w-full flex flex-col items-center justify-between py-3 px-4 fixed top-0 z-50 bg-background/95 backdrop-blur-md border-b shadow-sm mb-10">
          <div className="flex w-full justify-between items-center mb-3">
            <div className="font-bold text-xl tracking-tight text-primary cursor-pointer" onClick={() => nav("/")}>
              MANIT Marketplace
            </div>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="top" className="p-6 flex flex-col gap-6 bg-background/95 backdrop-blur-md">
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.25 }}
                  className="flex flex-col gap-5"
                >
                  <div className="flex justify-between items-center border-b pb-4">
                    <span className="font-semibold text-lg">{user ? user.username : 'Menu'}</span>
                    <ModeToggle />
                  </div>

                  {menuItems.map((item, idx) => (
                    <SheetClose asChild key={idx}>
                      <Button
                        variant="ghost"
                        className="flex items-center gap-3 text-base justify-start hover:bg-muted"
                        onClick={() => nav(item.path)}
                      >
                        {item.icon} {item.label}
                      </Button>
                    </SheetClose>
                  ))}

                  <div className="mt-4 pt-4 border-t flex flex-col gap-3">
                    <SheetClose asChild>
                      <Button className="w-full flex items-center gap-2 shadow-sm" onClick={() => nav("/profile/postad")}>
                        <PlusCircle className="h-4 w-4" /> Sell an Item
                      </Button>
                    </SheetClose>
                    {user ? (
                      <Button variant="destructive" onClick={logout} className="w-full">Logout</Button>
                    ) : (
                      <Button variant="outline" onClick={login} className="w-full">Login</Button>
                    )}
                  </div>
                </motion.div>
              </SheetContent>
            </Sheet>
          </div>
          <div className="w-full">
            <SearchBar />
          </div>
        </header>
      ) : (
        <header className="w-full flex items-center justify-between py-3 px-6 fixed top-0 z-50 bg-background/95 backdrop-blur-md border-b shadow-sm transition-all h-16">
          <div className="font-bold text-xl tracking-tight text-primary cursor-pointer shrink-0" onClick={() => nav("/")}>
            MANIT Marketplace
          </div>
          
          <div className="flex-1 max-w-2xl px-6">
            <SearchBar />
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <ModeToggle />
            
            <Button variant="ghost" size="icon" onClick={() => nav("/profile/wishlist")} title="Wishlist">
              <Heart className="h-5 w-5 text-muted-foreground hover:text-foreground transition-colors" />
            </Button>
            
            <Button variant="ghost" size="icon" title="Notifications">
              <Bell className="h-5 w-5 text-muted-foreground hover:text-foreground transition-colors" />
            </Button>

            <Button variant="ghost" size="icon" onClick={() => nav("/profile/chat")} title="Messages">
              <MessageCircle className="h-5 w-5 text-muted-foreground hover:text-foreground transition-colors" />
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <User className="h-5 w-5 text-muted-foreground hover:text-foreground transition-colors" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>{user ? user.username : "My Account"}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {user && <DropdownMenuItem onClick={() => nav("/profile/myprofile")}>Profile</DropdownMenuItem>}
                {user && <DropdownMenuItem onClick={() => nav("/profile/postad")}>My Listings</DropdownMenuItem>}
                <DropdownMenuSeparator />
                {user ? (
                  <DropdownMenuItem className="text-destructive focus:text-destructive cursor-pointer" onClick={logout}>Logout</DropdownMenuItem>
                ) : (
                  <DropdownMenuItem className="cursor-pointer" onClick={login}>Login</DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>

            <Button onClick={() => nav("/profile/postad")} className="ml-2 shadow-sm rounded-full px-5">
              <PlusCircle className="mr-2 h-4 w-4" /> Sell an Item
            </Button>
          </div>
        </header>
      )}
    </>
  );
}
