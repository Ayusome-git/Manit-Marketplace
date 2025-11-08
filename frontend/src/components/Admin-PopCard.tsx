import { Button } from "./ui/button"

type User = {
  userId: string
  username: string
  email: string
  phoneNo: string
  hostelNo: number
  products: string[]
  ratingsGiven: string[]
  ratingsReceived: string[]
  wishlist: string[]
  notification: string[]
  senderUser: string[]
  receiverUser: string[]
}

type Product = {
  productId: string
  category: string
  name: string
  description: string
  price: number
  productCondition: string
  viewCount: number
  listedAt: Date
  sellerId: string
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
  data: User
  // onClose: () => void
}

const PopCard = ({ data } : PopCardProps) => {
  return (
    <div className="flex justify-center items-center border border-yellow-400">
      <div className="w-full">
        hellooo
        {/* <Button onClick={onClose}>
          close
        </Button> */}
      </div>
    </div>
  )
}

export default PopCard