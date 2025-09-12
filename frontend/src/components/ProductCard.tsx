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
import { useNavigate } from "react-router-dom";

interface ProductImage {
  imageId: string | number;
  productId: string;
  imageUrl: string;
}

interface Product {
  productId: string;
  name: string;
  price: number;
  viewCount:number;
  productImages: ProductImage[];
}

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const plugin = React.useRef(Autoplay({ delay: 5000, stopOnInteraction: false }));
  const increaseCount = useProductStore((state) => state.increaseCount);
  const navigate=useNavigate();

  const handleClick = () => {
    increaseCount(product.productId);
    navigate(`/product/${product.productId}`);
  };

  return (
    <Card className="font-sans mb-4">
      <CardContent>
        <Carousel
          plugins={[plugin.current]}
          className="w-full max-w-xs"
          onMouseEnter={plugin.current.stop}
          onMouseLeave={plugin.current.reset}
        >
          <CarouselContent>
            {product.productImages.length > 0 ? (
              product.productImages.map((img, index) => (
                <CarouselItem key={index}>
                  <div className="p-1">
                    <Card className="">
                      <CardContent className="flex aspect-square items-center justify-center max-h-56">
                        <img
                          src={img.imageUrl}
                          alt={product.name}
                          className="overflow-hidden h-full w-full"
                        />
                      </CardContent>
                    </Card>
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
          <CarouselPrevious className="ml-7 size-5 cursor-pointer" />
          <CarouselNext className="mr-7 size-5 cursor-pointer" />
        </Carousel>
        <div onClick={handleClick} className="cursor-pointer">
        <div className="pt-2 text-xl">{product.name}</div>
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
            <Heart className="size-5 cursor-pointer hover:text-primary transition-colors hover:fill-primary" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
