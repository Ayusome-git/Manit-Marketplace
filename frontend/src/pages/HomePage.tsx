import { Button } from "@/components/ui/button";
import { Card, CardContent} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, Home, User, MessageSquare, PlusCircle } from "lucide-react";
import { ModeToggle } from "@/components/ui/darktoggle";
import axios from "axios";

export function Homepage() {
  async function profile(){
await axios.get("http://localhost:3000/api/v1/profile", {
  headers: {
    "authorization": localStorage.getItem("token")
  }
})
  }
  return (
    <main className="min-h-screen">
      <nav className="shadow-sm py-4 px-6 flex items-center justify-between">
        <h2 className="text-xl font-semibold">MANIT Marketplace</h2>
        <div className="flex gap-4 items-center">
            <ModeToggle/>
          <Button variant="ghost" className="flex items-center gap-1">
            <Home className="h-4 w-4" /> <div className="pt-0.5 ">Home</div>
          </Button>
          <Button variant="ghost" className=" gap-1 text-center" onClick={profile}>
            <User className="h-4 w-4 " /> <div className="pt-0.5">Profile</div>
          </Button>
          <Button variant="ghost" className="flex items-center gap-1">
            <MessageSquare className="h-4 w-4" /> Chat
          </Button>
          <Button variant="default" className="flex items-center gap-1 rounded-xl">
            <PlusCircle className="h-4 w-4" /> <div className="pt-0.5 pl-1">Post Ad</div>
          </Button>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto text-center px-4 py-8">
        <h1 className="text-6xl font-semibold  mb-4">
          MANIT Marketplace
        </h1>
        <p className=" mb-8 text-xl">
          Buy, sell, or exchange items with fellow MANIT students
        </p>

        <div className="flex items-center gap-2 justify-center max-w-md mx-auto mb-12">
          <Input placeholder="Search products..." className="rounded-xl" />
          <Button variant="default" className="rounded-xl px-4 items-center">
            <Search className="" />Search
          </Button>
        </div>

        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <Card key={item} className="">
              <CardContent className="">
                <div className="h-60 bg-gray-200 mb-4" />
                <h3 className="text-lg font-medium  mb-1">
                  Sample Product {item}
                </h3>
                <p className="text-sm ">₹{item * 100}</p>
              </CardContent>
            </Card>
          ))}
        </section>

        <footer className="mt-20  text-sm">
          © 2025 MANIT Marketplace. Built for the campus community.
        </footer>
      </div>
    </main>
  );
}
