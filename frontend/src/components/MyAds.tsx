import { useEffect } from "react";
import { useProductStore } from "@/store/useProductStore";
import { ProductCard } from "./ProductCard";
import { useAuthStore } from "@/store/useAuthStore";
import { Button } from "./ui/button";
import { PackageOpen, Tag, PlusCircle } from "lucide-react";
import { Skeleton } from "./ui/skeleton";
import { useNavigate } from "react-router-dom";

export function MyAds() {
  const { MyProducts, fetchMyProducts, loading, error } = useProductStore();
  const { user, login } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    fetchMyProducts();
  }, [fetchMyProducts]);

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] px-4">
        <div className="size-20 rounded-full bg-primary/10 flex items-center justify-center mb-6">
          <Tag className="size-10 text-primary" />
        </div>
        <h2 className="text-2xl font-bold mb-2">My Listings</h2>
        <p className="text-muted-foreground mb-8 text-center max-w-md">Please log in to view and manage your active listings.</p>
        <Button size="lg" className="px-8 rounded-full shadow-sm" onClick={login}>Login to Continue</Button>
      </div>
    );
  }

  return (
    <div className="font-sans container mx-auto px-4 py-8 max-w-6xl mt-4">
      <div className="flex items-end justify-between mb-8 border-b border-border/50 pb-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">My Listings</h1>
          <p className="text-muted-foreground mt-1">Manage the items you are currently selling.</p>
        </div>
        <Button onClick={() => navigate("/profile/add-product")} className="hidden sm:flex rounded-full shadow-sm">
          <PlusCircle className="mr-2 size-4" /> Add New Item
        </Button>
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
      ) : !MyProducts.length ? (
        <div className="flex flex-col items-center justify-center py-20 px-4 text-center border border-dashed rounded-2xl bg-muted/10">
          <PackageOpen className="size-16 text-muted-foreground/30 mb-4" />
          <h3 className="text-xl font-semibold mb-2">No active listings</h3>
          <p className="text-muted-foreground max-w-sm mb-6">You haven't posted any items for sale yet. Start selling to the MANIT community!</p>
          <Button onClick={() => navigate("/profile/add-product")} className="rounded-full">
            <PlusCircle className="mr-2 size-4" /> List an Item
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {MyProducts.map((product) => (
            <ProductCard key={product.productId} product={product} />
          ))}
        </div>
      )}
      
      <div className="mt-8 flex justify-center sm:hidden">
        <Button onClick={() => navigate("/profile/add-product")} className="w-full rounded-full shadow-sm">
          <PlusCircle className="mr-2 size-4" /> Add New Item
        </Button>
      </div>
    </div>
  );
}