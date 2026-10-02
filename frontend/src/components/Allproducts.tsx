import { useProductStore } from "@/store/useProductStore"
import { useEffect } from "react";
import { ProductCard } from "./ProductCard";
import { motion } from "motion/react";
import { SearchX } from "lucide-react";
import { Spinner } from "./ui/spinner";

type FilterProps = {
  category: string;
  viewMode?: "grid" | "compact";
}

export function AllProducts({ category, viewMode = "grid" }: FilterProps) {
  const { Products, loading, error, fetchProducts } = useProductStore()
  
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts, category]);
  
  if (loading) return (
    <div className="w-full flex justify-center py-20">
      <Spinner className="size-10 text-primary" />
    </div>
  );
  
  if (error) return (
    <div className="p-8 text-center bg-destructive/10 text-destructive rounded-2xl border border-destructive/20">
      {error}
    </div>
  );
  
  const filteredProducts = (category !== "all")
    ? Products.filter(product => product.category.toLowerCase() === category.toLowerCase())
    : Products;
    
  if (!filteredProducts.length) return (
    <div className="flex flex-col items-center justify-center py-20 text-center border border-dashed rounded-3xl bg-muted/10">
      <SearchX className="size-16 text-muted-foreground/30 mb-4" />
      <h3 className="text-xl font-semibold mb-2">No products found</h3>
      <p className="text-muted-foreground max-w-sm">We couldn't find any items matching your current filters. Try selecting a different category.</p>
    </div>
  );
  
  // Stagger container
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const item: any = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "linear" } }
  };

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className={
        viewMode === "grid" 
          ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" 
          : "flex flex-col gap-4"
      }
    >
      {filteredProducts.sort((a,b)=> b.viewCount - a.viewCount).map((product) => (
        <motion.div key={product.productId} variants={item}>
          <ProductCard product={product} compact={viewMode === "compact"} />
        </motion.div>
      ))}
    </motion.div>
  )
}