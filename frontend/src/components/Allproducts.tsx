import { useProductStore } from "@/store/useProductStore"
import { useEffect } from "react";
import { ProductCard } from "./ProductCard";


type filter={
    category:string
}


export function AllProducts(props:filter){
    const{Products, loading, error, fetchProducts} = useProductStore()
    useEffect(() => {
        fetchProducts();
      }, [fetchProducts,props.category]);
      if (loading) return <div>Loading featured products...</div>;
      if (error) return <div className="text-red-500">{error}</div>;
      // Filter products by category if a category is provided
      const filteredProducts = (props.category !=="all")
        ? Products.filter(product => product.category === props.category)
        : Products;
      if (!filteredProducts.length) return <div>No products available</div>;
    return<>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 px-10">
                {filteredProducts.sort((a,b)=> b.viewCount-a.viewCount).map((product) => (
                  <ProductCard key={product.productId} product={product} />
                ))}
        </div>
    </>
}