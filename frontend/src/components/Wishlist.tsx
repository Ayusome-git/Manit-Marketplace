import { useAuthStore } from "@/store/useAuthStore";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { useWishlistStore } from "@/store/useWishListStore";
import { useEffect } from "react";
import { ProductCard } from "./ProductCard";
import { Spinner } from "./ui/spinner";

export function Wishlist() {
  const { wishlist, fetchWishlist, loading, error } = useWishlistStore();
  const { user, login } = useAuthStore();
  useEffect(() => {
    if (user && user.userId) {
      fetchWishlist(user.userId);
    }
  }, [user, fetchWishlist]);

  if (!user) {
    return (
      <Card className="sm:mx-32 font-sans text-center  items-center">
        <div>Please log in to view your profile.</div>
        <Button className="w-fit cursor-pointer" onClick={login}>
          Login
        </Button>
      </Card>
    );
  }
  if (loading) return <div className="w-full flex justify-center items-center"><Spinner className="size-20"></Spinner></div>;
  if (error) return <div className="text-red-500">{error}</div>;
  if (!wishlist.length) return <Card className="font-sans p-5 mx-5 sm:mx-32 text-center">Wishlist is Empty</Card>

  return (
    <Card className="font-sans p-5 mx-5 sm:mx-32">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
        {wishlist.map((item) => (
          <ProductCard key={item.product.productId} product={item.product} />
        ))}
      </div>
    </Card>
  );
}