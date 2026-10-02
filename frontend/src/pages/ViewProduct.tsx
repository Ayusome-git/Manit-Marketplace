import { FeaturedProducts } from "@/components/FeatureProducts";
import { Product } from "@/components/Product";

export function ViewProduct() {
    return (
        <div className="pb-10">
            <Product />
            <div className="mt-12">
                <FeaturedProducts />
            </div>
        </div>
    );
}