import { useAuthStore } from "@/store/useAuthStore";
import { Button } from "./ui/button";
import { useWishlistStore } from "@/store/useWishListStore";
import { useEffect } from "react";
import { ProductCard } from "./ProductCard";
import { Heart, Search } from "lucide-react";
import { Skeleton } from "./ui/skeleton";
import { useNavigate } from "react-router-dom";

export function Wishlist() {
  const { wishlist, fetchWishlist, loading, error } = useWishlistStore();
  const { user, login } = useAuthStore();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (user && user.userId) {
      fetchWishlist(user.userId);
    }
  }, [user, fetchWishlist]);

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] px-4">
        <div className="size-20 rounded-full bg-primary/10 flex items-center justify-center mb-6">
          <Heart className="size-10 text-primary" />
        </div>
        <h2 className="text-2xl font-bold mb-2">Saved Items</h2>
        <p className="text-muted-foreground mb-8 text-center max-w-md">Please log in to view and manage your saved items.</p>
        <Button size="lg" className="px-8 rounded-full shadow-sm" onClick={login}>Login to Continue</Button>
      </div>
    );
  }

  return (
    <div className="font-sans container mx-auto px-4 py-8 max-w-6xl mt-4">
      <div className="mb-8 border-b border-border/50 pb-4">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Saved Items</h1>
        <p className="text-muted-foreground mt-1">Items you've bookmarked for later.</p>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex flex-col gap-3">
              <Skeleton className="h-48 w-full rounded-xl" />
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          ))}
        </div>
      ) : error ? (
        <div className="text-destructive text-center py-10 bg-destructive/10 rounded-xl max-w-2xl mx-auto">
          {error}
        </div>
      ) : !wishlist.length ? (
        <div className="flex flex-col items-center justify-center py-20 px-4 text-center border border-dashed rounded-2xl bg-muted/10">
          <Heart className="size-16 text-muted-foreground/30 mb-4" />
          <h3 className="text-xl font-semibold mb-2">No saved items yet</h3>
          <p className="text-muted-foreground max-w-sm mb-6">Save products you're interested in and they'll appear here.</p>
          <Button onClick={() => navigate("/products")} className="rounded-full">
            <Search className="mr-2 size-4" /> Browse Marketplace
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {wishlist.map((item) => (
            <ProductCard key={item.product.productId} product={item.product} />
          ))}
        </div>
      )}
    </div>
  );
}