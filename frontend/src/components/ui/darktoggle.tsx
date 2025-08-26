import { Moon, Sun } from "lucide-react"

import { Button } from "@/components/ui/button"
export function ModeToggle() {
    const { theme, setTheme } = useTheme();

    const toggleTheme = () => {
        setTheme(theme === "dark" ? "light" : "dark");
    };

    return (
        <Button variant="ghost" size="sm" onClick={toggleTheme}>
            <Sun className="h-[1.2rem] w-[1.2rem] scale-120 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-120 dark:rotate-0" />
            <span className="sr-only">Toggle theme</span>
        </Button>
    );
}
import { useTheme } from "./theme-provider"

