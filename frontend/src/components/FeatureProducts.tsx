import { ArrowRight, Flame } from "lucide-react";
import { ProductCard } from "./ProductCard";
import { useEffect } from "react";
import { useProductStore } from "../store/useProductStore";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/useAuthStore";
import { useWishlistStore } from "@/store/useWishListStore";
import { Spinner } from "./ui/spinner";
import { Button } from "./ui/button";
import { motion } from "motion/react";
import { Badge } from "./ui/badge";
import { SmartImage } from "./ui/smart-image";

export function FeaturedProducts() {
  const { featuredProducts, fetchFeaturedProducts, loading, error } = useProductStore();
  const { fetchWishlist } = useWishlistStore();
  const { user } = useAuthStore();
  
  const nav = useNavigate();

  useEffect(() => {
    fetchFeaturedProducts();
    if (user) {
      fetchWishlist(user.userId);
    }
  }, [fetchFeaturedProducts, user]);

  if (loading) return <div className="w-full flex justify-center items-center py-20"><Spinner className="size-10 text-primary" /></div>;
  if (error) return <div className="text-destructive text-center py-10 bg-destructive/10 rounded-xl mx-4 sm:mx-8 md:mx-32">{error}</div>;

  if (featuredProducts.length === 0) return null;

  const mainProduct = featuredProducts[0];
  const sideProducts = featuredProducts.slice(1, 4); // Take 3 smaller ones for compact vertical stacking

  return (
    <section className="font-sans container mx-auto px-4 sm:px-8 md:px-12 lg:px-32 mb-12">
      <div className="flex justify-between items-end mb-8 border-b border-border/50 pb-4">
        <div>
          <div className="flex items-center gap-2 text-orange-500 font-semibold mb-1">
            <Flame className="size-5" />
            <span className="text-xs uppercase tracking-widest font-bold">Trending</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground mt-1">Trending around campus</h2>
          <p className="text-muted-foreground mt-1 text-base">Items students are checking out right now.</p>
        </div>
        <Button variant="ghost" className="hidden sm:flex items-center gap-2 group text-muted-foreground hover:text-primary transition-colors" onClick={()=>nav("/products")}>
          View All <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
        </Button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-auto items-start">
        {/* Main Large Product */}
        {mainProduct && (
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7 rounded-2xl bg-card border border-border overflow-hidden relative group cursor-pointer shadow-sm hover:shadow-md transition-all duration-300 aspect-[4/3] sm:aspect-[16/9] flex flex-col"
            onClick={() => nav(`/product/${mainProduct.productId}`)}
          >
            <div className="absolute top-4 left-4 z-20">
              <Badge className="bg-background/90 backdrop-blur-md text-foreground border-border px-3 py-1 shadow-sm font-semibold text-xs tracking-wider uppercase">
                Most Popular
              </Badge>
            </div>
            
            <div className="flex-1 overflow-hidden relative w-full h-full">
              <SmartImage 
                product={mainProduct} 
                lazy={false}
                containerClassName="w-full h-full"
                className="transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent pointer-events-none" />
              
              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 z-10">
                <div className="text-xs text-blue-300 font-bold tracking-wider uppercase mb-2">{mainProduct.category}</div>
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2 line-clamp-1">{mainProduct.name}</h3>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-2xl sm:text-3xl font-bold text-white">₹{mainProduct.price?.toLocaleString() || mainProduct.price}</span>
                  <Button size="icon" className="rounded-full size-10 bg-white/20 hover:bg-white/30 backdrop-blur text-white opacity-0 group-hover:opacity-100 translate-x-[-10px] group-hover:translate-x-0 transition-all duration-300 pointer-events-none group-hover:pointer-events-auto">
                    <ArrowRight className="size-4" />
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Side Smaller Products */}
        <div className="lg:col-span-5 grid grid-cols-1 gap-4 sm:gap-6">
          {sideProducts.map((product, idx) => (
            <motion.div
              key={product.productId}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
            >
              <ProductCard product={product} compact={true} />
            </motion.div>
          ))}
        </div>
      </div>
      
      <div className="mt-8 flex justify-center sm:hidden">
        <Button variant="outline" className="w-full rounded-full h-12 font-medium" onClick={()=>nav("/products")}>
          View All Trending
        </Button>
      </div>
    </section>
  );
}
