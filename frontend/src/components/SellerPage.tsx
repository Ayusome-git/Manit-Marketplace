import { useAuthStore } from "@/store/useAuthStore";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Card, CardContent } from "./ui/card";
import { Spinner } from "./ui/spinner";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { Item, ItemContent, ItemDescription, ItemTitle } from "./ui/item";
import { ArrowRight, MapPin } from "lucide-react";
import { Button } from "./ui/button";
import { useChatStore } from "@/store/useChatStore";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel";
import { ProductCard } from "./ProductCard";




export function SellerPage(){
    const { id } = useParams<{ id: string }>();
  const{seller,viewSeller} =useAuthStore();
    const {user} = useAuthStore();
    const { createChat, setActiveChat, fetchChats} = useChatStore();
    const nav = useNavigate()
    

    const handleChatWithSeller = async () => {
      if (!user) {
        alert("Please log in to chat with the seller.");
        return;
      }
    
      if (!seller?.userId) {
        alert("Seller information not found.");
        return;
      }
      const sellerId = seller.userId;
      try {
        const existingChat = useChatStore
          .getState()
          .chats.find(
            (c) =>
              (c.user1Id === user.userId && c.user2Id === sellerId) ||
              (c.user1Id === sellerId && c.user2Id === user.userId)
          );
    
        let chatId = existingChat?.id;
        if (!chatId) {
          chatId = (await createChat(user.userId, sellerId)) ?? undefined;
          if (!chatId) {
            alert("Unable to create or retrieve chat ID.");
            return;
          }
          await fetchChats(user.userId);
        }
        const chat = useChatStore.getState().chats.find((c) => c.id === chatId);
        if (!chat) {
          alert("Chat not found after creation.");
          return;
        }
        setActiveChat(chat);
        await fetchChats(chat.id);
    
        nav("/profile/chat");
      } catch (err) {
        console.error("Failed to start chat:", err);
        alert("Unable to start chat at the moment.");
      }
    };


    useEffect(() => {
        if (id) viewSeller(id);
      }, [id, viewSeller]);

    return <div className="mt-30 flex w-full items-center justify-center font-sans">
        <div className="flex flex-col justify-center items-center">   
        <Card className="w-md ">
        <CardContent className="flex flex-col items-center justify-center gap-2">
            <Avatar className="size-30">
            <AvatarImage src={seller?.profilePhoto ?? undefined} alt="" />
            <AvatarFallback>
              <Spinner></Spinner>
            </AvatarFallback>
          </Avatar>
          <Item variant={"muted"} className="mt-5 w-full text-center justify-center flex flex-col">
            <ItemTitle className="text-3xl">{seller?.username}</ItemTitle>
            <div className="flex text-lg items-center"><MapPin size={20}></MapPin> Hostel-{seller?.hostelNo}</div>
        </Item>
        <Item variant="muted" className="w-full">
        <ItemContent>
          <ItemTitle className="text-xl">About</ItemTitle>
          <ItemDescription className="text-lg">
            {seller?.description}
          </ItemDescription>
        </ItemContent>
        </Item>
        <Button className="mt-2" onClick={handleChatWithSeller}>
                Chat With The Seller
        </Button>
        </CardContent>
        </Card>
        <div className="font-sans px-4 sm:px-8 md:px-32 pt-10">
      <div className="flex justify-between items-center mb-5">
        <div className="w-fit text-xl sm:text-4xl font-semibold caret-transparent">Other ads by this Seller</div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {seller?.products.map((product) => (
          <ProductCard key={product.productId} product={product} />
        ))}
      </div>
    </div>
    </div>
    </div>
}