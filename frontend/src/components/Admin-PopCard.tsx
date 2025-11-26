import { Button } from "./ui/button"

type User = {
  userId: string
  username: string
  email: string
  phoneNo: number
  hostelNo: number
  // description?: string | null
  // profilePhoto?: string
}

interface ProductImage {
  imageId: string | number;
  productId: string;
  imageUrl: string;
}

interface Seller {
  userId: string
  username: string
}

type Product = {
  productId: string;
  name: string;
  description: string;
  category: string;
  price: number;
  productCondition: string;
  purchaseDate?: string;
  viewCount: number;
  listedAt: string;
  sellerId: string
  productImages: ProductImage[];
  seller: Seller
}

type Wishlist = {

}

type Notification = {
  notificationId: number,
  userId: String,
  message: String,
  isRead: Boolean,
  notificationTime: Date,
}

type Chat = {
  id: number,
  senderId: String,
  receiverId: String,
  message: String,
  timestamp: Date
}

type PopCardProps = {
   user: User
  products: Product[]
  // onClose: () => void
}

const PopCard = ({ user, products }: PopCardProps) => {
  return (
    <div className="flex justify-center items-center border border-yellow-400">
      <div className="w-full">
        {/* phoneNo={user}
        hostelNo={user.hostelNo} */}
        {/* products={data.} */}
      </div>
    </div>
  )
}

export default PopCard