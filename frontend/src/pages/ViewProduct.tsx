import { Appbar } from "@/components/Appbar";
import { FeaturedProducts } from "@/components/FeatureProducts";
import { Product } from "@/components/Product";




export function ViewProduct(){
    return <div>
        <Appbar/>
        <div className="mt-40">
        <Product/>
        <div className="mt-15">
        <FeaturedProducts count={4}/>
        </div>

        </div>
    </div>
}