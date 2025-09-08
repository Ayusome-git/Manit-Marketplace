import { AddProduct } from "../components/AddProduct";
import { Appbar } from "../components/Appbar";




export function PostProduct(){
    return<>
    <Appbar/>
    <div className="mt-40">
        <AddProduct/>
    </div>
    </>
}