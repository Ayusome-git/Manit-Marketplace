
import { Appbar } from "@/components/Appbar";
import { FeaturedProducts } from "@/components/FeatureProducts";
import { Footer } from "@/components/Footer";
import { HeroSection } from "@/components/HeroSection";
import { ProductCard } from "@/components/ProductCard";
import { RecentlyAdded } from "@/components/RecentlyAdded";
import axios from "axios";

export function Homepage() {

  return (
    <div>
    <div><HeroSection/></div>
    <div><FeaturedProducts/></div>
    <div><RecentlyAdded/></div>
    </div>
  );
}
