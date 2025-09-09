import { Heart, MessageCircle, PlusCircle, User, Menu } from "lucide-react";
import { ModeToggle } from "./ui/darktoggle";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useNavigate } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";

export function Appbar() {
  const nav = useNavigate();
  const isMobile = useIsMobile();

  return (
    <>
      {isMobile ? (
        <Card className="w-full flex flex-row items-center justify-between border-none rounded-sm py-3 px-4 font-sans fixed top-0 z-50">
          <div className="font-bold text-xl">Manit Marketplace</div>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="top" className="p-4 flex flex-col gap-4">
              <div className="flex flex-col gap-3 justify-center">
                <div className="flex justify-center text-sm items-center"><ModeToggle />Toggle Theme</div>
                <Button
                  variant="ghost"
                  className="flex items-center gap-2"
                  onClick={() => nav("/profile")}
                >
                  <User className="h-5 w-5" /> Profile
                </Button>
                <Button
                  variant="ghost"
                  className="flex items-center gap-2"
                  onClick={() => nav("/wishlist")}
                >
                  <Heart className="h-5 w-5" /> Wishlist
                </Button>
                <Button
                  variant="ghost"
                  className="flex items-center gap-2"
                  onClick={() => nav("/messages")}
                >
                  <MessageCircle className="h-5 w-5" /> Messages
                </Button>
                <div className="flex justify-center">
                <Button
                  className="flex items-center gap-2 w-fit "
                  onClick={() => nav("/postad")}
                >
                  <PlusCircle className="h-5 w-5" /> Post Ad
                </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </Card>
      ) : (
        <Card className="w-full flex flex-row border-none rounded-sm items-center justify-between py-3 px-6 font-sans fixed top-0 z-50">
          <div className="font-bold text-2xl">Manit Marketplace</div>
          <div className="flex items-center gap-5">
            <ModeToggle />
            <User
              className="cursor-pointer hover:text-primary"
              onClick={() => nav("/profile")}
            />
            <Heart
              className="cursor-pointer hover:text-primary"
              onClick={() => nav("/wishlist")}
            />
            <MessageCircle
              className="cursor-pointer hover:text-primary"
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
