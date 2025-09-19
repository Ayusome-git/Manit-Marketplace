
const AdminUserDetails = () => {

  const user_data = [
    {
      userId: "6287f8127312cd123",
      username: "utkarsh",
      email: "utk_123@manit.stu.in",
      phoneNo: "9876757483",
      hostelNo: 9, // range [1–12]
      products: ["calculator"],
      ratingsGiven: ["7", "5"], // out of 10
      ratingsReceived: ["8", "6", "8"],
      wishlist: ["cycle"],
      notification: ["Your product got a new wishlist!"],
      senderUser: ["hi"],
      receiverUser: ["hey"],
    },
    {
      userId: "6287f8127312cd456",
      username: "ananya",
      email: "ananya_56@manit.stu.in",
      phoneNo: "9876123456",
      hostelNo: 3,
      products: ["DSA Book", "Laptop Bag"],
      ratingsGiven: ["9"],
      ratingsReceived: ["7", "9"],
      wishlist: ["headphones"],
      notification: ["You received a 9★ rating."],
      senderUser: ["is this still available?"],
      receiverUser: ["yes, it is!"],
    },
    {
      userId: "6287f8127312cd789",
      username: "rohan",
      email: "rohan_21@manit.stu.in",
      phoneNo: "9823456789",
      hostelNo: 11,
      products: ["bicycle", "mini fridge"],
      ratingsGiven: ["8", "6"],
      ratingsReceived: ["7"],
      wishlist: ["gaming chair"],
      notification: [""],
      senderUser: ["can I get it by tomorrow?"],
      receiverUser: ["sure, no problem"],
    },
    {
      userId: "6287f8127312cd101",
      username: "megha",
      email: "megha_14@manit.stu.in",
      phoneNo: "9812345678",
      hostelNo: 7,
      products: ["headphones", "novels"],
      ratingsGiven: ["10", "8"],
      ratingsReceived: ["9", "10"],
      wishlist: ["calculator", "fridge"],
      notification: ["Your headphone listing crossed 20 views!"],
      senderUser: ["thanks!"],
      receiverUser: ["welcome!"],
    },
    {
      userId: "6287f8127312cd202",
      username: "arjun",
      email: "arjun_99@manit.stu.in",
      phoneNo: "9876543100",
      hostelNo: 2,
      products: ["table lamp"],
      ratingsGiven: ["6", "7"],
      ratingsReceived: ["8"],
      wishlist: ["novels"],
      notification: ["Your table lamp got a new view."],
      senderUser: ["is the price negotiable?"],
      receiverUser: ["yes, we can discuss"],
    },
    {
      userId: "6287f8127312cd303",
      username: "priya",
      email: "priya_45@manit.stu.in",
      phoneNo: "9765432188",
      hostelNo: 6,
      products: ["hostel cupboard", "mug"],
      ratingsGiven: ["5"],
      ratingsReceived: ["7", "8"],
      wishlist: ["laptop bag"],
      notification: ["You received a new rating."],
      senderUser: ["can you deliver to hostel 6?"],
      receiverUser: ["yes, that’s fine"],
    },
    {
      userId: "6287f8127312cd404",
      username: "sneha",
      email: "sneha_33@manit.stu.in",
      phoneNo: "9654321899",
      hostelNo: 4,
      products: ["water bottle", "cycle lock"],
      ratingsGiven: ["8", "9"],
      ratingsReceived: ["10"],
      wishlist: ["mini fridge"],
      notification: ["Cycle lock added to wishlist by Rohan."],
      senderUser: ["thank you!"],
      receiverUser: ["anytime :)"],
    },
    {
      userId: "6287f8127312cd505",
      username: "kabir",
      email: "kabir_77@manit.stu.in",
      phoneNo: "9543219877",
      hostelNo: 12,
      products: ["guitar", "sports shoes"],
      ratingsGiven: ["9"],
      ratingsReceived: ["8", "7"],
      wishlist: ["bicycle", "headphones"],
      notification: ["Your guitar post is trending!"],
      senderUser: ["interested in your shoes"],
      receiverUser: ["let’s meet tomorrow"],
    }
  ]

  return (
    <div>
      AdminUserDetails
    </div>
  )
}

export default AdminUserDetails