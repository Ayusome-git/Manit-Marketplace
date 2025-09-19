import { Eye, Heart, MapPin } from "lucide-react";
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

interface ProductImage {
  imageId: string | number;
  productId: string;
  imageUrl: string;
}
interface Seller{
  userId:string
  username:string
}

interface Product {
  productId: string;
  name: string;
  price: number;
  viewCount: number;
  productImages: ProductImage[];
  seller:Seller
}

interface ProductCardProps {
  product: Product;
}
export function ProductCard({ product }: ProductCardProps) {
  const plugin = React.useRef(Autoplay({ delay: 5000 }));
  const increaseCount = useProductStore((state) => state.increaseCount);
  const navigate = useNavigate();
  const {user} = useAuthStore()
  const handleClick = () => {
    increaseCount(product.productId);
    navigate(`/product/${product.productId}`);
  };

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
              <Eye className="size-5" /> {product.viewCount}
            </div>
            <div>
              {(
                !user ||
                (product.seller?.userId && user.userId && product.seller.userId !== user.userId)
              ) && (
                <Heart className="size-5 cursor-pointer hover:text-primary transition-colors hover:fill-primary" />
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
