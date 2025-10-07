import { useNavigate } from "react-router-dom";
import { Card } from "./ui/card";
import type { Product } from "@/store/useProductStore";

interface SearchResultProps {
    product: Product;
}

export function SearchResult({ product }: SearchResultProps) {
    const navigate =useNavigate()
    return (
        <Card onClick={()=>navigate(`/product/${product.productId}`)} className="flex flex-row gap-2 w-full font-sans text-sm items-center p-2 justify-start cursor-pointer my-1 shadow-none rounded-none">
            <img src={product.productImages[0]?.imageUrl || ''} alt={product.name} className="size-16" />
            <div className="text-lg truncate">{product.name}</div>
        </Card>
    );
}