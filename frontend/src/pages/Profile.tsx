import App from "@/App";
import { Appbar } from "@/components/Appbar";
import { ProfileTab } from "@/components/Profile-tab";




export function Profile(){
    return<>
    <Appbar/>
    <div className="flex justify-center items-center mt-40"><ProfileTab/></div>
    </>

}