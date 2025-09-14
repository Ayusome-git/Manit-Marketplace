import { SearchIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card } from "./ui/card";

export function HeroSection() {
  return (
    <div className="min-h-[24rem] flex items-center justify-center font-sans mt-16">
      <div className="w-full max-w-4xl px-6 text-center">
        <div className="text-5xl sm:text-7xl font-bold text-foreground mb-4 hover:cursor-none hover:text-primary transition-colors">
          MANIT Marketplace
        </div>
        <p className="text-sm text-muted-foreground mb-6 font-semibold">
          Buy and sell within your campus — simple, secure and local.
        </p>

          <Card className="mx-auto max-w-xl flex flex-row p-5">
          <Input
            placeholder="Search products, brands or categories"
          />
          <Button type="submit" aria-label="Search">
            <SearchIcon className="h-4 w-4" />
          </Button>
          </Card>
        </div>
    </div>
  );
}