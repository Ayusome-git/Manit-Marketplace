import { useState, useEffect } from "react";
import { AllProducts } from "./Allproducts";
import { FilterCard } from "./FilterCard";
import { Grid, List, Filter } from "lucide-react";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { useSearchParams } from "react-router-dom";

export function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get("category")?.toLowerCase() || "all";
  const [category, setCategory] = useState(initialCategory);
  const [viewMode, setViewMode] = useState<"grid" | "compact">("grid");

  useEffect(() => {
    const queryCategory = searchParams.get("category")?.toLowerCase();
    if (queryCategory && queryCategory !== category) {
      setCategory(queryCategory);
    }
  }, [searchParams]);

  const handleCategoryChange = (val: string) => {
    setCategory(val);
    setSearchParams(val === "all" ? {} : { category: val });
  };

  return (
    <div className="font-sans container mx-auto px-4 sm:px-8 md:px-12 lg:px-32 pt-24 pb-10 min-h-screen">
      <div className="mb-6 border-b border-border/50 pb-4">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Products</h1>
      </div>

      <div className="flex items-center justify-between mb-6">
        <div className="text-sm text-muted-foreground font-medium">
          Showing results for <span className="text-foreground capitalize">{category}</span>
        </div>
        
        <div className="flex items-center gap-4">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="md:hidden flex items-center gap-2 rounded-full">
                <Filter className="size-4" /> Filters
              </Button>
            </SheetTrigger>
            <SheetContent side="bottom" className="rounded-t-[2rem] h-[60vh]">
              <div className="pt-6">
                <FilterCard value={category} onChange={handleCategoryChange} />
              </div>
            </SheetContent>
          </Sheet>

          <div className="hidden sm:flex items-center bg-muted/50 p-1 rounded-full border border-border/50">
            <button 
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded-full transition-all ${viewMode === 'grid' ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
            >
              <Grid className="size-4" />
            </button>
            <button 
              onClick={() => setViewMode("compact")}
              className={`p-2 rounded-full transition-all ${viewMode === 'compact' ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
            >
              <List className="size-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="hidden md:block md:col-span-1">
          <div className="sticky top-24">
            <FilterCard value={category} onChange={handleCategoryChange} />
          </div>
        </div>
        <div className="md:col-span-3">
          <AllProducts category={category} viewMode={viewMode} />
        </div>
      </div>
    </div>
  );
}
