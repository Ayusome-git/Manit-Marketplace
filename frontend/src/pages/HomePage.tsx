import { FeaturedProducts } from "@/components/FeatureProducts";
import { HeroSection } from "@/components/HeroSection";
import { RecentlyAdded } from "@/components/RecentlyAdded";
import { CategoryList } from "@/components/CategoryList";
import { HowItWorks } from "@/components/HowItWorks";
import { CampusTrust } from "@/components/CampusTrust";

export function Homepage() {
  return (
    <div className="min-h-screen pb-10">
      <HeroSection />
      <CategoryList />
      <FeaturedProducts />
      <RecentlyAdded />
      <HowItWorks />
      <CampusTrust />
    </div>
  );
}
