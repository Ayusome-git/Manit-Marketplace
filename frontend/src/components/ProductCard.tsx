import { CircleAlert, Edit, Eye, Heart, MapPin, Trash2 } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import React from "react";
import { useProductStore } from "@/store/useProductStore";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/useAuthStore";
import { useWishlistStore } from "@/store/useWishListStore";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { Button } from "./ui/button";
import { Wishlist } from "./Wishlist";

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
}
export function ProductCard({ product }: ProductCardProps) {
  const plugin = React.useRef(Autoplay({ delay: 5000 }));
  const increaseCount = useProductStore((state) => state.increaseCount);
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const{loading, error: productError, deleteProduct} =useProductStore()
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

  function remove() {
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
    toast.warning("Item Removed from WishList");
  }

  function handleAddToWishlist() {
    if (user) {
      addToWishlist(user.userId, product.productId);
    }
    if (wishlistError) {
      toast.error(wishlistError);
      return;
    }
    toast.success("Item Added to WishList");
  }
  function deleteAd(pid:string){
    if(!pid){
      toast.error("error");
      return;
    }
    deleteProduct(pid)
    if(productError){
      toast(productError)
    }
    toast("Advertisment Deleted")
    
  }

  return (
    <Card className="font-sans mb-4 p-0 px-0 pb-5">
      <CardContent className="pt-0 px-0">
        <Carousel
          plugins={[plugin.current]}
          className="w-full max-w-xs pt-0 px-0"
          onMouseEnter={plugin.current.stop}
          onMouseLeave={plugin.current.reset}
        >
          <CarouselContent className="pt-0 px-0">
            {product.productImages.length > 0 ? (
              product.productImages.map((img, index) => (
                <CarouselItem key={index}>
                  <div className="relative flex justify-center items-center mb-1 px-0 group">
                    <div className="flex aspect-square items-center justify-center h-72 w-full">
                      <img
                        src={img.imageUrl}
                        alt={product.name}
                        className="overflow-hidden h-full w-full object-cover rounded-t-xl"
                      />
                    </div>
                    <CarouselPrevious
                      className="absolute left-3 top-1/2 -translate-y-1/2 size-8 cursor-pointer 
                 bg-black/50 text-white rounded-full flex items-center justify-center opacity-0
                  group-hover:opacity-100 transition-opacity duration-300
                 hover:bg-black hover:text-primary"
                    />
                    <CarouselNext
                      className="absolute right-3 top-1/2 -translate-y-1/2 size-8 cursor-pointer 
                 bg-black/50 text-white rounded-full flex items-center justify-center
                 opacity-0 group-hover:opacity-100 transition-opacity duration-300
                 hover:bg-black hover:text-primary"
                    />
                  </div>
                </CarouselItem>
              ))
            ) : (
              <CarouselItem>
                <div className="p-1">
                  <Card>
                    <CardContent className="flex aspect-square items-center justify-center p-6 max-h-56">
                      No Image
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            )}
          </CarouselContent>
        </Carousel>
        <div className="px-5">
          <div onClick={handleClick} className="cursor-pointer">
            <div className="pt-2 text-xl truncate">{product.name}</div>
            <div className="flex justify-between">
              <div className="py-1">₹{product.price}</div>
              <div className="flex items-center gap-1">
                <MapPin className="size-4" /> Hostel-9
              </div>
            </div>
          </div>
          <div className="flex justify-between items-center ">
            <div className="flex items-center gap-1">
              <Eye className="size-5 text-primary"/> {product.viewCount}
            </div>
            {(user && user.userId !== product.sellerId) && (
              <div>
                {isInWishlist(product.productId) ? (
                  <Heart
                    onClick={() => remove()}
                    className="size-5 cursor-pointer text-primary transition-colors fill-primary"
                  />
                ) : (
                  <Heart
                    onClick={() => handleAddToWishlist()}
                    className="size-5 cursor-pointer hover:text-primary transition-colors hover:fill-primary"
                  />
                )}
              </div>
            )}
            {(user && user.userId===product.sellerId) && <div className="flex gap-2 items-center">
              <Link to={`/edit/${product.productId}`}><Edit className="size-5 text-primary cursor-pointer"></Edit></Link>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Trash2 className="size-5 text-destructive hover:fill-destructive cursor-pointer"></Trash2>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                      Are you sure you want to Delete Your Ad?
                    <AlertDialogDescription className="text-destructive flex items-center gap-2">
                     <CircleAlert/>This action is irreversible!
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel className="cursor-pointer">
                      Cancel
                    </AlertDialogCancel>
                      <Button variant="destructive" className="cursor-pointer" onClick={()=>deleteAd(product.productId)}>Delete Ad</Button>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
