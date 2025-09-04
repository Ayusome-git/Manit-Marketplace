import { ArrowRight } from "lucide-react";
import { ProductCard } from "./ProductCard";



export function FeaturedProducts(){
    return( 
        <div className="font-sans px-4 sm:px-8 md:px-32">
            <div className="flex justify-between items-center mb-5">
            <div className="w-fit text-xl sm:text-4xl font-semibold">
                Featured Items
            </div>
            <div className="text-xl sm:text-4xl flex items-center gap-2 font-semibold cursor-pointer">
                View All <ArrowRight className="sm:size-10"/>
            </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {/* Replace the below array with your actual products data from backend */}
            {[1,2,3,4,5,6,7,8].map((item, idx) => (
                <ProductCard key={idx} />
            ))}
            </div>
        </div>
    )
}