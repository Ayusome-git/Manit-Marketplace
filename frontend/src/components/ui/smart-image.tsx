import { useState, useEffect } from "react";
import { Tag } from "lucide-react";
import type { Product } from "@/store/useProductStore";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "motion/react";

export function getProductImageUrl(product: Product | undefined | null): string | null {
  if (!product) return null;
  // If product uses productImages array
  if (product.productImages && Array.isArray(product.productImages) && product.productImages.length > 0) {
    const img = product.productImages[0];
    if (typeof img === 'string') return img; // Just in case it's a string array from somewhere
    if (img && typeof img === 'object' && img.imageUrl) return img.imageUrl;
  }
  
  // Legacy or alternative field structures just in case
  const p = product as any;
  if (p.images && Array.isArray(p.images) && p.images.length > 0) {
    if (typeof p.images[0] === 'string') return p.images[0];
    if (p.images[0].imageUrl) return p.images[0].imageUrl;
  }
  if (p.imageUrl && typeof p.imageUrl === 'string') return p.imageUrl;
  
  return null;
}

interface SmartImageProps {
  product?: Product;
  src?: string | null;
  alt?: string;
  className?: string;
  containerClassName?: string;
  objectFit?: "cover" | "contain";
  lazy?: boolean;
}

export function SmartImage({
  product,
  src,
  alt = "Product image",
  className,
  containerClassName,
  objectFit = "cover",
  lazy = true
}: SmartImageProps) {
  const [status, setStatus] = useState<"loading" | "loaded" | "error">("loading");
  
  // Determine URL
  const imageUrl = src !== undefined ? src : getProductImageUrl(product);
  
  useEffect(() => {
    if (!imageUrl) {
      setStatus("error");
      return;
    }
    setStatus("loading");
  }, [imageUrl]);

  const handleLoad = () => setStatus("loaded");
  const handleError = () => setStatus("error");

  return (
    <div className={cn("relative overflow-hidden bg-muted flex items-center justify-center", containerClassName)}>
      <AnimatePresence mode="wait">
        {status === "loading" && imageUrl && (
          <motion.div
            key="skeleton"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-muted animate-pulse"
          />
        )}
        
        {status === "error" || !imageUrl ? (
          <motion.div
            key="fallback"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center text-muted-foreground/50 w-full h-full p-4"
          >
            <Tag className="size-8 sm:size-10 mb-2 opacity-40" />
            <span className="text-xs sm:text-sm font-medium opacity-60 text-center">Image unavailable</span>
          </motion.div>
        ) : (
          <motion.img
            key="image"
            src={imageUrl}
            alt={alt}
            loading={lazy ? "lazy" : "eager"}
            onLoad={handleLoad}
            onError={handleError}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: status === "loaded" ? 1 : 0, scale: status === "loaded" ? 1 : 1.05 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className={cn(
              "w-full h-full",
              objectFit === "cover" ? "object-cover" : "object-contain",
              className
            )}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
