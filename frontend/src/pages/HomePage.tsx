
import { FeaturedProducts } from "@/components/FeatureProducts";

import { HeroSection } from "@/components/HeroSection";

import { RecentlyAdded } from "@/components/RecentlyAdded";



export function Homepage() {
  return (
    <div>
    <div><HeroSection/></div>
    <div><FeaturedProducts/></div>
    <div><RecentlyAdded/></div>
    </div>
  );
}
