import { SearchIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Input } from "./ui/input";



export function SearchBar(){
    return <>
    <Card className="mx-auto max-w-xl flex flex-row p-5">
          <Input
            placeholder="Search products, brands or categories"
          />
          <Button type="submit" aria-label="Search">
            <SearchIcon className="h-4 w-4" />
          </Button>
          </Card>
    </>
}