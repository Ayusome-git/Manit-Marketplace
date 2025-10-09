import { SearchBar } from "./SearchBar";
import { useProductStore } from "@/store/useProductStore";
import { useEffect } from "react";

export function HeroSection() {
  const { fetchProducts } = useProductStore();
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const HERO_BG =
    "https://res.cloudinary.com/deo1sywlo/image/upload/v1757395048/products/IMG_9915.jpg";

  return (
    <div className="relative min-h-[35rem] flex items-center justify-center font-sans mt-12 mb-10">
      <div
        className="absolute inset-0 -z-10 bg-cover bg-center"
        style={{ backgroundImage: `url("${HERO_BG}")` }}
      />
      <div className="absolute inset-0 -z-5 bg-black/50 dark:bg-black/60" />

      <div className="w-full px-6 text-center relative z-10">
        <div className="text-5xl sm:text-7xl font-bold text-white mb-4 transition-colors cursor-none hover:text-primary">
          MANIT Marketplace
        </div>
        <p className="text-sm text-white/90 mb-6 font-semibold">
          Buy and sell within your campus — simple, secure and local.
        </p>
        <SearchBar />
      </div>
    </div>
  );
}