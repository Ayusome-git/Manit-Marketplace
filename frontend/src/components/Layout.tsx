import { Appbar } from "@/components/Appbar";
import { Footer } from "@/components/Footer";
import { Outlet } from "react-router-dom";

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
    </div>
  );
}
