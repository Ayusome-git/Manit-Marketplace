import { ArrowRight, Clock } from "lucide-react";
import { ProductCard } from "./ProductCard";
import { useEffect } from "react";
import { useProductStore } from "../store/useProductStore";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";

export function RecentlyAdded() {
  const { RecentProducts, fetchRecentProducts, loading, error } = useProductStore();
  const nav=useNavigate()

  useEffect(() => {
    fetchRecentProducts();
  }, [fetchRecentProducts]);

  if (loading) return null; // Can use a skeleton here later
  if (error) return <div className="text-destructive text-center py-10 bg-destructive/10 rounded-xl mx-4 sm:mx-8 md:mx-32">{error}</div>;

  if (RecentProducts.length === 0) return null;

  return (
    <section className="font-sans px-4 sm:px-8 md:px-12 lg:px-32 mb-16">
      <div className="flex justify-between items-end mb-8 border-b pb-4">
        <div>
          <div className="flex items-center gap-2 text-muted-foreground font-medium mb-1">
            <Clock className="size-4" />
            <span className="text-sm uppercase tracking-wider">Fresh Listings</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">Recently Added</h2>
        </div>
        <Button variant="ghost" className="hidden sm:flex items-center gap-2 group" onClick={()=>nav("/products")}>
          View All <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
        </Button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {RecentProducts.slice(0,4).map((product) => (
          <ProductCard key={product.productId} product={product} />
        ))}
      </div>
      <div className="mt-6 flex justify-center sm:hidden">
        <Button variant="outline" className="w-full" onClick={()=>nav("/products")}>
          View All Recent
        </Button>
      </div>
    </section>
  );
}
