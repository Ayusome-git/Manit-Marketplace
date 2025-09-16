import { AppWindowIcon, CodeIcon } from "lucide-react"

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { AddProduct } from "./AddProduct"
import { MyAds } from "./MyAds"
import { Chat } from "./Chat"
import { MyProfile } from "./MyProfile"
import { useNavigate, useParams } from "react-router-dom"
import { useEffect } from "react"

const validTabs = ["chat", "myprofile", "myads", "postad"];
const defaultTab = "myprofile";
export function ProfileTab() {
    const navigate=useNavigate()
    const {tab} = useParams<{tab:string}>();

  return (
    <div className="flex w-full flex-col gap-6 font-sans">
      <Tabs value={tab && validTabs.includes(tab) ? tab : defaultTab}>
        <TabsList className="gap-3 mx-32 ">
          <TabsTrigger value="postad" className="text-xl hover:cursor-pointer" onClick={()=>navigate("/profile/postad")}>Post Ad</TabsTrigger>
          <TabsTrigger value="myads" className="text-xl hover:cursor-pointer" onClick={()=>navigate("/profile/myads")}>My Ads</TabsTrigger>
          <TabsTrigger value="chat" className="text-xl hover:cursor-pointer"onClick={()=>navigate("/profile/chat")}>Chat</TabsTrigger>
          <TabsTrigger value="myprofile" className="text-xl hover:cursor-pointer"onClick={()=>navigate("/profile/myprofile")}>My Profile</TabsTrigger>
        </TabsList>
        <TabsContent value="postad">
          <AddProduct/>
        </TabsContent>
        <TabsContent value="myads">
          <MyAds/>
        </TabsContent>
        <TabsContent value="chat">
            <Chat/>
        </TabsContent>
        <TabsContent value="myprofile">
            <MyProfile/>
        </TabsContent>
      </Tabs>
    </div>
  )
}
