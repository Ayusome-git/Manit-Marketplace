
import { Appbar } from "@/components/Appbar";
import { HeroSection } from "@/components/HeroSection";
import axios from "axios";

export function Homepage() {

  return (
    <div>
    <div className="flex justify-center">
      <Appbar/>
    </div>
    <div><HeroSection/></div>
    </div>
  );
}
