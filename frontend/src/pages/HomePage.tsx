
import { Appbar } from "@/components/Appbar";
import { FeaturedProducts } from "@/components/FeatureProducts";
import { HeroSection } from "@/components/HeroSection";
import { ProductCard } from "@/components/ProductCard";
import axios from "axios";

export function Homepage() {

  return (
    <div>
    <div className="flex justify-center">
      <Appbar/>
    </div>
    <div><HeroSection/></div>
    <div><FeaturedProducts/></div>
    </div>
  );
}
