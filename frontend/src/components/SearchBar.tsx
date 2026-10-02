import { SearchIcon } from "lucide-react";
import { Button } from "./ui/button";
import { useCommandStore } from "@/store/useCommandStore";

export function SearchBar() {
    const { setOpen } = useCommandStore();

    return (
        <div className="relative w-full max-w-lg mx-auto">
            <Button 
                variant="outline" 
                className="w-full relative justify-start text-muted-foreground bg-muted/40 hover:bg-muted/80 border-transparent shadow-sm rounded-full px-4 h-10 transition-all duration-200 overflow-hidden group"
                onClick={() => setOpen(true)}
            >
                <SearchIcon className="mr-2 h-4 w-4 group-hover:text-primary transition-colors" />
                <span className="hidden sm:inline-flex truncate text-sm font-normal">Search electronics, books, cycles...</span>
                <span className="inline-flex sm:hidden truncate text-sm font-normal">Search...</span>
                
                <kbd className="pointer-events-none absolute right-2 hidden h-6 select-none items-center gap-1 rounded-full border border-border/50 bg-background/50 px-2.5 font-sans text-[11px] font-medium opacity-100 sm:flex text-muted-foreground group-hover:text-foreground transition-colors">
                    <span className="text-xs">⌘</span>K
                </kbd>
            </Button>
        </div>
    );
}