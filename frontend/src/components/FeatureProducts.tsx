import { ArrowRight } from "lucide-react";
import { ProductCard } from "./ProductCard";
import { useEffect } from "react";
import { useProductStore } from "../store/useProductStore";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/useAuthStore";

export function FeaturedProducts() {
  const { featuredProducts, fetchFeaturedProducts, loading, error } = useProductStore();
  
  const nav = useNavigate()

  useEffect(() => {
    fetchFeaturedProducts();
  }, [fetchFeaturedProducts]);

  if (loading) return <div>Loading featured products...</div>;
  if (error) return <div className="text-red-500">{error}</div>;
  if (!featuredProducts.length) return <div>No products available</div>;

  return (
    <div className="font-sans px-4 sm:px-8 md:px-32">
      <div className="flex justify-between items-center mb-5">
        <div className="w-fit text-xl sm:text-4xl font-semibold">Featured Items</div>
        <div className="text-xl sm:text-4xl flex items-center gap-2 font-semibold cursor-pointer hover:text-primary transition-colors" onClick={()=>nav("/products")}>
          View All <ArrowRight className="sm:size-10" />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {featuredProducts.slice(0,4).map((product) => (
          <ProductCard key={product.productId} product={product} />
        ))}
      </div>
    </div>
  );
}
