import { Eye, Heart, MapPin } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import Autoplay from "embla-carousel-autoplay"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel"
import React from "react";


export function ProductCard(){

    const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: false })
    )
    return(
        <Card className="font-sans">
            <CardContent>
            <Carousel
            plugins={[plugin.current]}
            className="w-full max-w-xs"
            onMouseEnter={plugin.current.stop}
            onMouseLeave={plugin.current.reset}>
            <CarouselContent className="">
                {Array.from({ length: 6}).map((_, index) => (
                <CarouselItem key={index}>
                    <div className="p-1">
                    <Card>
                        <CardContent className="flex aspect-square items-center justify-center p-6">
                        <span className="text-4xl font-semibold">{index + 1}</span>
                        </CardContent>
                    </Card>
                    </div>
                </CarouselItem>
                ))}
            </CarouselContent>
                <CarouselPrevious className="ml-7 size-5"/>
                <CarouselNext className="mr-7 size-5" />
            </Carousel>
            <div className="pt-2 text-xl">Hero cycle 6 Gear dual disc </div>
            <div className="flex justify-between">
                <div className="py-1">₹5000</div>
            <div className="flex items-center gap-1"><MapPin className="size-4"/> Hostel-9</div></div>
            <div className="flex justify-between items-center ">
                <div className="flex items-center gap-1"><Eye className="size-5"/>15 views</div>
                <div><Heart className="size-5"/></div>
            </div>
            </CardContent>
        </Card>
    )
}