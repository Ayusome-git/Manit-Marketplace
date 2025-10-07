import { SearchIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { SearchResult } from "./SearchResult";
import { useEffect, useState } from "react";
import { useProductStore } from "@/store/useProductStore";
import { Product } from "./Product";
import { useNavigate } from "react-router-dom";
import { ScrollArea } from "./ui/scroll-area";

export function SearchBar() {
    const [isFocused, setIsFocused] = useState(false);
    const [query,setQuery]=useState("");
    const{Products} = useProductStore();
    const nav = useNavigate()
    return (

        <>
            <Card className="mx-auto max-w-xl flex flex-col p-5 relative">
                <div className="flex w-full">
                    <Input
                        placeholder="Search products, brands or categories"
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => { setTimeout(() => { console.log('Input blurred'); setIsFocused(false); }, 200); }}
                        onChange={(e)=>setQuery(e.target.value)}
                    />
                    <Button type="submit" aria-label="Search">
                        <SearchIcon className="h-4 w-4" />
                    </Button>
                </div>
                {isFocused && query && (
                    <ScrollArea className="absolute top-full h-56 left-0 w-full z-10 flex flex-col items-start gap-2">
                        {Products.filter(product =>
                            product.name.toLowerCase().includes(query.toLowerCase()) ||
                            product.category.toLowerCase().includes(query.toLowerCase())
                        ).map(filteredProduct => (
                            <SearchResult key={filteredProduct.productId} product={filteredProduct} />
                        ))}
                        {Products.filter(product =>
                            product.name.toLowerCase().includes(query.toLowerCase()) ||
                            product.category.toLowerCase().includes(query.toLowerCase())
                        ).length === 0 && (
                          <div className="flex flex-col items-center justify-center w-full gap-2">
                            <div>No Products Found</div>
                            <Button  onClick={() => nav('/products')} className="text-center ">
                                View All Products
                            </Button>
                          </div>
                        )}
                    </ScrollArea>
                )}
            </Card>
        </>
    );
}