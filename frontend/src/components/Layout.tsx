import { Appbar } from "@/components/Appbar";
import { Footer } from "@/components/Footer";
import { Outlet } from "react-router-dom";
import { CommandPalette } from "@/components/CommandPalette";

export function Layout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Appbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <footer className="w-full">
        <Footer />
      </footer>
      <CommandPalette />
    </div>
  );
}
