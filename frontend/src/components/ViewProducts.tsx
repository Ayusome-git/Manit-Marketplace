import { useState } from "react";
import { AllProducts } from "./Allproducts";
import { FilterCard } from "./FilterCard";
import { SearchBar } from "./SearchBar";
import { Card } from "./ui/card";





export function ProductsPage() {
    const [category, setCategory]=useState("all")
  return (
    <div className="px-32 mt-30">
        <div className="mb-10"><SearchBar/></div>
      <div className="grid grid-cols-4 grid-rows-1 gap-4">
        <FilterCard value={category} onChange={setCategory}/>
        <Card className="col-span-3"><AllProducts category={category}/></Card>
      </div>
    </div>
  );
}
