import { Eye, Heart, MapPin } from "lucide-react";
import { Card, CardContent, CardHeader } from "./ui/card";


export function ProductCard(){
    return(
        <Card className="font-sans">
            <CardContent><img src="https://res.cloudinary.com/dfi92r28h/image/upload/v1753160232/cld-sample-5.jpg"></img>
            <div className="pt-2 text-xl">Hero cycle 6 Gear dual disc </div>
            <div className="flex justify-between">
                <div className="py-1">₹5000</div>
            <div className="flex items-center gap-1"><MapPin className="size-4"/> Hostel-9</div></div>
            <div className="flex justify-between items-center ">
                <div className="flex items-center gap-1"><Eye className="size-5"/>15 views</div>
                <div><Heart className="size-5"/></div>
            </div>
            </CardContent>
        </Card>
    )
}