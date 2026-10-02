import { useProductStore } from "@/store/useProductStore";
import { Card, CardContent } from "@/components/ui/card";
import { Eye, Heart, MapPin, MessageCircle, Edit, Calendar, X, Maximize2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Badge } from "./ui/badge";
import { useAuthStore } from "@/store/useAuthStore";
import { useChatStore } from "@/store/useChatStore";
import { useWishlistStore } from "@/store/useWishListStore";
import { toast } from "sonner";
import { Skeleton } from "./ui/skeleton";
import { motion, AnimatePresence } from "motion/react";
import { SmartImage, getProductImageUrl } from "./ui/smart-image";

export function Product() {
  const { fetchProduct, product, loading, error } = useProductStore();
  const { user } = useAuthStore();
  const { createChat, setActiveChat, fetchChats} = useChatStore();
  const { id } = useParams<{ id: string }>();
  const nav = useNavigate();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const {
    addToWishlist,
    isInWishlist,
    removeFromWishlist,
    getWishlistItemByProductId,
    error: wishlistError,
  } = useWishlistStore();

  useEffect(() => {
    if (id) {
      fetchProduct(id);
    }
  }, [fetchProduct, id]);

  function remove() {
    if (!user){
      toast.warning("Login to remove from Wishlist");
      return;
    } 
      
    if(!product) return;
    const wishlistItem = getWishlistItemByProductId(
      user.userId,
      product.productId
    );
    const wishlistId = wishlistItem?.wishlistId;
    if (!wishlistId) return;
    removeFromWishlist(wishlistId);
    if (wishlistError) {
      toast.error(wishlistError);
      return;
    }
    toast.success("Item removed from Wishlist");
  }

  function handleAddToWishlist() {
    if (!user){
      toast.warning("Login to save this item");
      return;
    } 
    if(!product) return;
    
    addToWishlist(user.userId, product.productId);
    
    if (wishlistError) {
      toast.error(wishlistError);
      return;
    }
    toast.success("Item saved to Wishlist");
  }
  
 const handleChatWithSeller = async () => {
  if (!user) {
    toast.error("Please log in to chat with the seller.");
    return;
  }

  if (!product?.seller?.userId) {
    toast.error("Seller information not found.");
    return;
  }
  const sellerId = product.seller.userId;
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
        toast.error("Unable to create or retrieve chat ID.");
        return;
      }
      await fetchChats(user.userId);
    }
    const chat = useChatStore.getState().chats.find((c) => c.id === chatId);
    if (!chat) {
      toast.error("Chat not found after creation.");
      return;
    }
    setActiveChat(chat);
    await fetchChats(chat.id);

    nav("/profile/chat");
  } catch (err) {
    console.error("Failed to start chat:", err);
    toast.error("Unable to start chat at the moment.");
  }
};

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 mt-16 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-7">
            <Skeleton className="w-full aspect-[4/3] rounded-3xl" />
            <div className="flex gap-4 mt-4">
              <Skeleton className="size-24 rounded-xl" />
              <Skeleton className="size-24 rounded-xl" />
              <Skeleton className="size-24 rounded-xl" />
            </div>
          </div>
          <div className="lg:col-span-5 flex flex-col gap-6">
            <Skeleton className="h-12 w-3/4" />
            <Skeleton className="h-10 w-1/3" />
            <Skeleton className="h-24 w-full rounded-2xl" />
            <Skeleton className="h-40 w-full rounded-2xl" />
          </div>
        </div>
      </div>
    );
  }

  if (error) return <div className="text-destructive text-center py-20 mt-16 text-xl">{error}</div>;
  if (!product) return <div className="text-center py-20 mt-16 text-xl text-muted-foreground">No item found</div>;

  const isOwner = user?.userId === product.sellerId;
  const inWishlist = isInWishlist(product.productId);
  const mainImage = selectedImage || getProductImageUrl(product);

  return (
    <div className="container mx-auto px-4 py-8 sm:py-12 mt-16 max-w-6xl font-sans relative">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
        {/* Left Column: Images (Scrollable) */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="lg:col-span-7 flex flex-col gap-6"
        >
          <div className="bg-muted rounded-3xl overflow-hidden border border-border/50 relative group aspect-[4/3] w-full">
            <div 
              className="w-full h-full cursor-zoom-in relative"
              onClick={() => {
                if (mainImage) setLightboxOpen(true);
              }}
            >
              <SmartImage 
                src={mainImage} 
                lazy={false}
                containerClassName="w-full h-full"
                className="transition-transform duration-700 group-hover:scale-[1.02]" 
              />
              {mainImage && (
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center pointer-events-none">
                  <div className="size-12 rounded-full bg-background/80 backdrop-blur opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center shadow-lg transform translate-y-4 group-hover:translate-y-0">
                    <Maximize2 className="size-5 text-foreground" />
                  </div>
                </div>
              )}
            </div>
            
            {/* Wishlist Button */}
            {!isOwner && (
              <Button 
                variant="secondary" 
                size="icon" 
                className={`absolute top-6 right-6 rounded-full shadow-lg z-10 size-12 transition-transform hover:scale-110 ${inWishlist ? 'text-destructive bg-white hover:bg-white/90' : 'bg-background/80 backdrop-blur hover:bg-background'}`}
                onClick={inWishlist ? remove : handleAddToWishlist}
              >
                <Heart className={`size-5.5 ${inWishlist ? 'fill-current' : ''}`} />
              </Button>
            )}
          </div>
          
          {/* Thumbnail Gallery */}
          {product.productImages && product.productImages.length > 1 && (
            <div className="grid grid-cols-4 sm:grid-cols-5 gap-3">
              {product.productImages.map((img, index) => (
                <div 
                  key={index} 
                  onClick={() => setSelectedImage(img.imageUrl)}
                  className={`aspect-square rounded-2xl overflow-hidden border-2 cursor-pointer transition-all duration-300 ${mainImage === img.imageUrl ? 'border-primary shadow-md scale-95' : 'border-transparent hover:border-border/80'}`}
                >
                  <SmartImage src={img.imageUrl} containerClassName="w-full h-full" />
                </div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Right Column: Sticky Product Details */}
        <div className="lg:col-span-5 relative">
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
            className="lg:sticky lg:top-28 flex flex-col"
          >
            <div className="mb-8">
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <Badge variant="secondary" className="px-3 py-1 text-xs font-bold tracking-widest uppercase rounded-full">
                  {product.category}
                </Badge>
                {product.productCondition && (
                  <Badge variant="outline" className="px-3 py-1 text-xs font-bold tracking-widest uppercase rounded-full border-primary/30 bg-primary/5 text-primary">
                    {product.productCondition}
                  </Badge>
                )}
                {product.viewCount > 20 && (
                  <Badge variant="secondary" className="px-3 py-1 text-xs font-bold tracking-widest uppercase rounded-full bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400">
                    Trending
                  </Badge>
                )}
              </div>
              
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-4 leading-[1.1]">{product.name}</h1>
              <div className="text-4xl font-bold text-foreground mb-2">₹{product.price?.toLocaleString() || product.price}</div>
              
              <div className="flex items-center gap-4 text-sm text-muted-foreground mt-4 font-medium">
                <div className="flex items-center gap-1.5">
                  <Eye className="size-4" />
                  <span>{product.viewCount} views</span>
                </div>
                <div className="w-1 h-1 rounded-full bg-border"></div>
                <div className="flex items-center gap-1.5">
                  <Calendar className="size-4" />
                  <span>Listed recently</span>
                </div>
              </div>
            </div>

            <Card className="border-border/50 shadow-sm mb-8 rounded-3xl overflow-hidden bg-card">
              <CardContent className="p-6 flex flex-col gap-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Avatar className="size-14 border border-border/50 shadow-sm">
                      <AvatarImage src={product.seller?.profilePhoto || undefined} />
                      <AvatarFallback className="bg-primary/10 text-primary text-xl font-bold">
                        {product.seller?.username?.charAt(0).toUpperCase() || 'M'}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-bold text-lg">{product.seller?.username || 'MANIT Student'}</div>
                      <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                        <MapPin className="size-4" /> MANIT Campus, Bhopal
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="pt-5 border-t border-border/50">
                  {!isOwner ? (
                    <Button size="lg" className="w-full text-base font-bold shadow-md rounded-2xl h-14 bg-primary hover:bg-primary/90 text-primary-foreground transition-all hover:shadow-lg hover:-translate-y-0.5" onClick={handleChatWithSeller}>
                      <MessageCircle className="mr-2 size-5" /> Chat with Seller
                    </Button>
                  ) : (
                    <Link to={`/edit/${product.productId}`} className="w-full block">
                      <Button size="lg" variant="outline" className="w-full text-base font-bold shadow-sm rounded-2xl h-14 border-primary/20 hover:bg-primary/5">
                        <Edit className="mr-2 size-5" /> Edit Listing
                      </Button>
                    </Link>
                  )}
                </div>
              </CardContent>
            </Card>

            <div className="flex flex-col gap-4">
              <h3 className="font-bold text-xl tracking-tight">Description</h3>
              <div className="text-muted-foreground leading-relaxed whitespace-pre-wrap text-base font-light">
                {product.description || "No description provided."}
              </div>
            </div>
            
          </motion.div>
        </div>
      </div>

      {/* Full Screen Lightbox Modal */}
      <AnimatePresence>
        {lightboxOpen && mainImage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm p-4 sm:p-8"
            onClick={() => setLightboxOpen(false)}
          >
            <Button 
              variant="ghost" 
              size="icon" 
              className="absolute top-4 right-4 sm:top-8 sm:right-8 text-white/70 hover:text-white hover:bg-white/10 rounded-full size-12"
              onClick={(e) => { e.stopPropagation(); setLightboxOpen(false); }}
            >
              <X className="size-6" />
            </Button>
            
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="max-w-full max-h-full h-full w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <SmartImage src={mainImage} lazy={false} objectFit="contain" containerClassName="w-full h-full bg-transparent" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
