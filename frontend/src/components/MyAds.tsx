import { useEffect } from "react";
import { Card } from "./ui/card"
import { useProductStore } from "@/store/useProductStore";
import { ArrowRight } from "lucide-react";
import { ProductCard } from "./ProductCard";
import { useAuthStore } from "@/store/useAuthStore";
import { Button } from "./ui/button";


export function MyAds(){
    const { MyProducts, fetchMyProducts, loading, error } = useProductStore();
    const {user,login}=useAuthStore();

  useEffect(() => {
    fetchMyProducts();
  }, [fetchMyProducts]);

  if (!user) {
     return (
    <Card className="sm:mx-32 font-sans text-center  items-center">
      <div>Please log in to view your profile.</div>
      <Button className="w-fit cursor-pointer" onClick={login}>Login</Button>
    </Card>
  );
}
  if (loading) return <div>Loading featured products...</div>;
  if (error) return <div className="text-red-500">{error}</div>;
  if (!MyProducts.length) return <div>No products available</div>;

  return (
    <Card className="font-sans p-5 mx-5 sm:mx-32">
      <div className="flex justify-between items-center mb-5">
        <div className="w-fit text-xl sm:text-4xl font-semibold">Featured Items</div>
        <div className="text-xl sm:text-4xl flex items-center gap-2 font-semibold cursor-pointer hover:text-primary transition-colors">
          View All <ArrowRight className="sm:size-10" />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
        {MyProducts.map((product) => (
          <ProductCard key={product.productId} product={product} />
        ))}
      </div>
    </Card>
  );
}