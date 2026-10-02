import { CircleAlert, Edit, Eye, Heart, Trash2, ArrowRight } from "lucide-react";
import React from "react";
import { useProductStore } from "@/store/useProductStore";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/useAuthStore";
import { useWishlistStore } from "@/store/useWishListStore";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { SmartImage } from "./ui/smart-image";
import { motion } from "motion/react";

interface ProductImage {
  imageId: string | number;
  productId: string;
  imageUrl: string;
}
interface Seller {
  userId: string;
  username: string;
}

export interface Product {
  productId: string;
  name: string;
  description: string;
  category: string;
  price: number;
  productCondition: string;
  purchaseDate?: string | undefined;
  viewCount: number;
  sellerId: string;
  productImages: ProductImage[];
  seller: Seller;
}

interface ProductCardProps {
  product: Product;
  compact?: boolean;
}

export function ProductCard({ product, compact = false }: ProductCardProps) {
  const increaseCount = useProductStore((state) => state.increaseCount);
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { error: productError, deleteProduct } = useProductStore();
  const {
    addToWishlist,
    isInWishlist,
    removeFromWishlist,
    getWishlistItemByProductId,
    error: wishlistError,
  } = useWishlistStore();

  const handleClick = () => {
    increaseCount(product.productId);
    navigate(`/product/${product.productId}`);
  };

  function remove(e: React.MouseEvent) {
    e.stopPropagation();
    if (!user) return;
    const wishlistItem = getWishlistItemByProductId(
      user.userId,
      product.productId
    );
    const wishlistId = wishlistItem?.wishlistId;
    if (!wishlistId) return;
    removeFromWishlist(wishlistId);
    if (wishlistError) {
      toast.error(wishlistError);
      return;
    }
  }

  function handleAddToWishlist(e: React.MouseEvent) {
    e.stopPropagation();
    if (user) {
      addToWishlist(user.userId, product.productId);
    } else {
      toast.error("Please login to save items");
      return;
    }
    if (wishlistError) {
      toast.error(wishlistError);
      return;
    }
  }

  function deleteAd(pid: string) {
    if (!pid) {
      toast.error("Error identifying product");
      return;
    }
    deleteProduct(pid);
    if (productError) {
      toast.error(productError);
    } else {
      toast.success("Listing deleted successfully");
    }
  }

  const isOwner = user && user.userId === product.sellerId;
  const inWishlist = isInWishlist(product.productId);
  const isTrending = product.viewCount > 20;

  if (compact) {
    return (
      <div 
        className="group overflow-hidden border border-border/50 bg-card hover:shadow-md transition-all duration-300 flex flex-row h-[140px] rounded-2xl cursor-pointer" 
        onClick={handleClick}
      >
        <div className="relative h-full w-[140px] shrink-0 bg-muted overflow-hidden">
          <SmartImage 
            product={product} 
            containerClassName="w-full h-full"
            className="transition-transform duration-500 group-hover:scale-105"
          />
          {!isOwner && (
            <button
              onClick={inWishlist ? remove : handleAddToWishlist}
              className={`absolute top-2 left-2 p-1.5 rounded-full backdrop-blur-md shadow-sm transition-all duration-200 z-10 
                ${inWishlist ? 'bg-background text-destructive hover:bg-background/90' : 'bg-black/20 text-white hover:bg-black/40'}`}
            >
              <Heart className={`size-3 ${inWishlist ? 'fill-current' : ''}`} />
            </button>
          )}
        </div>

        <div className="p-4 flex flex-col flex-grow justify-between min-w-0">
          <div>
            <div className="flex justify-between items-start gap-2 mb-1">
              <h3 className="font-semibold text-base sm:text-lg leading-tight truncate text-foreground">{product.name}</h3>
              <div className="font-bold text-base sm:text-lg text-foreground whitespace-nowrap">₹{product.price?.toLocaleString() || product.price}</div>
            </div>
            
            <div className="text-[11px] sm:text-xs text-muted-foreground flex items-center gap-1.5 mb-2 line-clamp-1">
              <span className="uppercase tracking-wider font-semibold text-primary">{product.category || 'Uncategorized'}</span>
              {product.productCondition && (
                <>
                  <span className="text-[10px]">•</span>
                  <span className="capitalize">{product.productCondition.toLowerCase()} condition</span>
                </>
              )}
            </div>
            
            {isTrending && (
              <Badge variant="secondary" className="text-[10px] h-5 bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400 border-none">
                Trending 🔥
              </Badge>
            )}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <div className="size-5 rounded-full bg-secondary flex items-center justify-center font-medium text-secondary-foreground text-[10px]">
                {product.seller?.username?.charAt(0).toUpperCase() || 'M'}
              </div>
              <span className="truncate max-w-[100px]">{product.seller?.username || 'MANIT Student'}</span>
            </div>
            
            <Button variant="ghost" size="icon" className="size-8 rounded-full opacity-0 group-hover:opacity-100 transition-opacity bg-primary/5 text-primary hover:bg-primary/10">
              <ArrowRight className="size-4" />
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      className="group relative flex flex-col bg-card border border-border/60 hover:border-border rounded-2xl overflow-hidden cursor-pointer shadow-sm hover:shadow-lg transition-all duration-300 transform sm:hover:-translate-y-1"
      onClick={handleClick}
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted">
        <SmartImage 
          product={product} 
          containerClassName="w-full h-full"
          className="transition-transform duration-500 group-hover:scale-[1.025]"
        />
        
        {/* Badges */}
        {isTrending && (
          <div className="absolute top-3 left-3 z-10">
            <Badge className="bg-background/95 backdrop-blur text-foreground border-border/50 shadow-sm font-semibold text-[10px] uppercase tracking-wider px-2 py-0.5">
              Trending
            </Badge>
          </div>
        )}

        {/* Wishlist Button - Floating */}
        {!isOwner && (
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={inWishlist ? remove : handleAddToWishlist}
            className={`absolute top-3 right-3 p-2 rounded-full shadow-sm backdrop-blur-md transition-all duration-200 z-10 
              ${inWishlist ? 'bg-background text-red-500 hover:bg-background/90' : 'bg-background/70 text-foreground/70 hover:bg-background hover:text-foreground'}`}
          >
            <Heart className={`size-4 ${inWishlist ? 'fill-current' : ''}`} />
          </motion.button>
        )}
      </div>

      <div className="p-4 sm:p-5 flex flex-col flex-grow bg-card">
        {/* Category & Condition */}
        <div className="flex items-center gap-2 text-[11px] sm:text-xs font-semibold tracking-wider text-muted-foreground uppercase mb-2">
          <span className="text-blue-600 dark:text-blue-400">{product.category || 'Uncategorized'}</span>
          <span className="opacity-50">•</span>
          <span className="capitalize">{product.productCondition ? product.productCondition.toLowerCase() : 'Used'}</span>
        </div>
        
        {/* Title */}
        <h3 className="font-semibold text-base sm:text-[17px] leading-snug text-foreground line-clamp-2 mb-2 group-hover:text-primary transition-colors">
          {product.name}
        </h3>

        {/* Price */}
        <div className="font-bold text-[19px] sm:text-xl text-foreground mb-4">
          ₹{product.price?.toLocaleString() || product.price}
        </div>

        {/* Quick Action Overlay (Desktop Hover) */}
        <div className="absolute inset-x-0 bottom-[64px] flex justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none hidden sm:flex">
          <div className="bg-background/95 backdrop-blur-sm text-foreground text-xs font-medium px-4 py-1.5 rounded-full shadow-md flex items-center gap-1.5 transform translate-y-2 group-hover:translate-y-0 transition-all">
            View item <ArrowRight className="size-3" />
          </div>
        </div>

        {/* Seller Row */}
        <div className="mt-auto pt-4 flex items-center justify-between border-t border-border/50 bg-card">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <div className="size-6 rounded-full bg-secondary flex items-center justify-center font-medium text-secondary-foreground">
              {product.seller?.username?.charAt(0).toUpperCase() || 'M'}
            </div>
            <span className="truncate max-w-[120px] font-medium text-foreground/80">{product.seller?.username || 'MANIT Student'}</span>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 text-[11px] text-muted-foreground font-medium" title="Views">
              <Eye className="size-3" />
              <span>{product.viewCount}</span>
            </div>
            
            {isOwner && (
              <div className="flex items-center gap-1 -mr-2" onClick={(e) => e.stopPropagation()}>
                <Link to={`/edit/${product.productId}`}>
                  <Button variant="ghost" size="icon" className="size-6 rounded-full hover:bg-primary/10 hover:text-primary">
                    <Edit className="size-3" />
                  </Button>
                </Link>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="ghost" size="icon" className="size-6 rounded-full hover:bg-destructive/10 hover:text-destructive">
                      <Trash2 className="size-3" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogDescription className="text-destructive flex items-center gap-2 font-medium text-base">
                        <CircleAlert className="size-5" /> Are you sure you want to delete this listing?
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <Button variant="destructive" onClick={() => deleteAd(product.productId)}>Delete</Button>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
