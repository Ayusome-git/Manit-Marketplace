import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import { useProductStore } from "@/store/useProductStore";
import { useEffect, useMemo } from "react";
import { ArrowRight, Tag, Heart } from "lucide-react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { SmartImage } from "./ui/smart-image";

export function HeroSection() {
  const { fetchProducts, Products } = useProductStore();
  const nav = useNavigate();
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  const moveX = useTransform(springX, [-0.5, 0.5], [-15, 15]);
  const moveY = useTransform(springY, [-0.5, 0.5], [-15, 15]);
  
  const moveXReverse = useTransform(springX, [-0.5, 0.5], [15, -15]);
  const moveYReverse = useTransform(springY, [-0.5, 0.5], [15, -15]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  // Get some random products for the visual showcase
  const displayProducts = useMemo(() => {
    if (!Products || Products.length === 0) return null;
    return [...Products].sort(() => 0.5 - Math.random()).slice(0, 3);
  }, [Products]);

  const mainProduct = displayProducts?.[0];
  const secProduct = displayProducts?.[1];
  const thirdProduct = displayProducts?.[2];

  return (
    <div 
      className="relative min-h-[85vh] flex items-center pt-16 sm:pt-20 font-sans overflow-hidden bg-background"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/5 via-background to-background pointer-events-none" />
      
      <div className="container mx-auto px-4 sm:px-8 md:px-12 lg:px-32 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Left Side: Copy */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col items-start pt-20 lg:pt-0"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold tracking-wide uppercase mb-6 border border-primary/20">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            The Campus Marketplace
          </div>
          
          <h1 className="text-5xl sm:text-6xl lg:text-[72px] leading-[1.05] font-bold tracking-tight text-foreground mb-6">
            Everything you need. <br />
            <span className="text-primary italic pr-2">Already on campus.</span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-lg mb-10 leading-relaxed font-light">
            Buy, sell, and discover items directly from students around you. No shipping, no wait times.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <Button 
              size="lg" 
              className="rounded-full px-8 h-14 text-base shadow-lg hover:shadow-primary/25 transition-all w-full sm:w-auto group" 
              onClick={() => nav("/products")}
            >
              Explore Marketplace
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="rounded-full px-8 h-14 text-base border-border/50 hover:bg-muted w-full sm:w-auto" 
              onClick={() => nav("/profile/add-product")}
            >
              <Tag className="mr-2 h-4 w-4 text-muted-foreground" /> Sell an Item
            </Button>
          </div>
        </motion.div>

        {/* Right Side: Interactive Composition */}
        <div className="hidden lg:block relative h-[600px] w-full perspective-1000">
          {mainProduct ? (
            <>
              {/* Main Product Card */}
              <motion.div 
                style={{ x: moveX, y: moveY }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-[300px] rounded-2xl bg-card border border-border/50 shadow-2xl overflow-hidden p-3 cursor-pointer"
                onClick={() => nav(`/product/${mainProduct.productId}`)}
              >
                <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-muted mb-3">
                  <SmartImage product={mainProduct} lazy={false} />
                  <div className="absolute top-2 right-2 size-8 rounded-full bg-background/80 backdrop-blur-md flex items-center justify-center text-muted-foreground hover:bg-background hover:text-foreground transition-colors">
                    <Heart className="size-4" />
                  </div>
                </div>
                <div className="px-2 pb-2">
                  <div className="text-xs text-muted-foreground mb-1 uppercase tracking-wider font-semibold">{mainProduct.category}</div>
                  <div className="font-semibold text-foreground truncate text-lg leading-tight">{mainProduct.name}</div>
                  <div className="font-bold text-xl mt-1.5">₹{mainProduct.price.toLocaleString()}</div>
                </div>
              </motion.div>

              {/* Floating Element 1 (Secondary Product) */}
              {secProduct && (
                <motion.div 
                  style={{ x: moveXReverse, y: moveYReverse }}
                  initial={{ opacity: 0, scale: 0.8, x: -100, y: 100 }}
                  animate={{ opacity: 1, scale: 1, x: -120, y: 80 }}
                  transition={{ duration: 1, delay: 0.2 }}
                  className="absolute top-1/2 left-1/2 z-30 flex items-center gap-3 p-2 pr-4 rounded-full bg-card border border-border/50 shadow-xl cursor-pointer"
                  onClick={() => nav(`/product/${secProduct.productId}`)}
                >
                  <div className="size-12 rounded-full overflow-hidden bg-muted">
                    <SmartImage product={secProduct} lazy={false} />
                  </div>
                  <div>
                    <div className="text-[10px] font-bold text-primary uppercase tracking-widest">Recently Listed</div>
                    <div className="text-sm font-semibold text-foreground truncate max-w-[100px]">{secProduct.name}</div>
                  </div>
                </motion.div>
              )}

              {/* Floating Element 2 (Price Tag) */}
              {thirdProduct && (
                <motion.div 
                  style={{ x: moveX, y: moveYReverse }}
                  initial={{ opacity: 0, scale: 0.8, x: 100, y: -100 }}
                  animate={{ opacity: 1, scale: 1, x: 120, y: -120 }}
                  transition={{ duration: 1, delay: 0.4 }}
                  className="absolute top-1/2 left-1/2 z-10 px-5 py-3 rounded-2xl bg-card border border-border/50 shadow-lg text-center cursor-pointer"
                  onClick={() => nav(`/product/${thirdProduct.productId}`)}
                >
                  <div className="text-xs text-muted-foreground mb-1 font-semibold uppercase tracking-widest">Trending</div>
                  <div className="font-bold text-2xl text-foreground">₹{thirdProduct.price?.toLocaleString() || thirdProduct.price}</div>
                </motion.div>
              )}

              {/* Decorative Blur Orbs */}
              <motion.div 
                style={{ x: moveXReverse, y: moveY }}
                className="absolute top-[20%] left-[20%] w-32 h-32 bg-primary/20 rounded-full blur-[60px] z-0" 
              />
              <motion.div 
                style={{ x: moveX, y: moveYReverse }}
                className="absolute bottom-[20%] right-[20%] w-40 h-40 bg-blue-500/10 rounded-full blur-[60px] z-0" 
              />
            </>
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <div className="w-64 h-64 border-4 border-dashed border-border rounded-full animate-spin-slow opacity-20" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}