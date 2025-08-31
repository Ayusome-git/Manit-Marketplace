import { Card, CardContent, CardHeader } from "./ui/card";


export function ProductCard(){
    return(
        <Card className="font-sans">
            <CardContent><img src="https://res.cloudinary.com/dfi92r28h/image/upload/v1753160232/cld-sample-5.jpg"></img>
            <div className="pt-2 text-xl">Hero cycle 6 Gear dual disc </div>
            <div>5000</div>
            </CardContent>
        </Card>
    )
}