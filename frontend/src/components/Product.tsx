import { useProductStore } from "@/store/useProductStore";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../components/ui/carousel";
import { Eye, Heart, MapPin } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import { Badge } from "./ui/badge";
import { useAuthStore } from "@/store/useAuthStore";
import { ImageZoom } from "./ui/shadcn-io/image-zoom";

export function Product() {
  const { fetchProduct, product, loading, error } = useProductStore();
  const { user } = useAuthStore();
  const { id } = useParams<{ id: string }>();
  const isMobile = useIsMobile();
  useEffect(() => {
    if (id) {
      fetchProduct(id);
    }
  }, [fetchProduct, id]);

  if (loading) return <div>Loading featured products...</div>;
  if (error) return <div className="text-red-500">{error}</div>;
  if (!product) return <div>No products available</div>;
  return (
    <div className="grid grid-cols-1 md:grid-cols-7 px-5 sm:gap-4 font-sans">
      <div className="md:col-span-3 md:col-start-2">
        <Card>
          <Carousel className="w-full max-w-lg mx-auto">
            <CarouselContent>
              {product.productImages.length > 0 ? (
                product.productImages.map((img, index) => (
                  <CarouselItem key={index}>
                    <div className="p-1 justify-center items-center flex mb-1">
                      <ImageZoom>
                      <div className="flex aspect-square items-center justify-center ">
                        <img
                          src={img.imageUrl}
                          alt={product.name}
                          className="overflow-hidden h-full w-full object-cover"
                        />
                      </div>
                        </ImageZoom>
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
            {!isMobile && (
              <>
                <CarouselPrevious className="cursor-pointer hover:text-primary transition-colors hover:fill-primary" />
                <CarouselNext className="cursor-pointer hover:text-primary transition-colors hover:fill-primary" />
              </>
            )}
          </Carousel>
        </Card>
        <Card className="mt-5">
          <CardContent className="flex gap-5">
            <Badge>{product.category}</Badge>
            <Badge variant="secondary">{product.productCondition}</Badge>
            <Badge variant="secondary">{2024}</Badge>
          </CardContent>
        </Card>
      </div>
      <div className="md:col-span-2 md:col-start-5 mt-5 sm:mt-0 ">
        <Card>
          <CardContent className="flex flex-col items-start gap-1">
            <div className="text-3xl">{product.name}</div>
            <div className="gap-1 text-2xl">₹{product.price}</div>
            <div className="flex justify-between items-center w-full ">
              <div className="flex items-center gap-1">
                <Eye className="size-5" /> {product.viewCount}
              </div>
              <div>
                {(!user ||
                  (product.seller?.userId &&
                    user.userId &&
                    product.seller.userId !== user.userId)) && (
                  <Heart className="size-5 cursor-pointer hover:text-primary transition-colors hover:fill-primary" />
                )}
              </div>
            </div>
            <div className="flex items-center gap-1 justify-center w-full">
              <MapPin className="size-4" /> Hostel-9
            </div>
          </CardContent>
        </Card>
        <Card className="mt-5">
          <CardContent>
            <div className="flex gap-2">
              <Avatar className="size-12">
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div>
                <div className="text-xl">{product.seller.username}</div>
                <div className="flex items-center gap-1 text-sm">
                  <MapPin className="size-4" /> Hostel-9
                </div>
              </div>
            </div>
            <div className="w-full mt-4 flex justify-center items-center">
              <Button>Chat With The Seller</Button>
            </div>
          </CardContent>
        </Card>
        <Card className="mt-5 max-h-[254px] overflow-hidden">
          <CardContent>
            <div className="w-full flex justify-center text-2xl pb-2">
              Product Description
            </div>
            <ScrollArea className=" h-[254px] pb-20 px-0">
              {product.description}
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
