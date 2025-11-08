import { useState } from "react"
import { format, startOfWeek, startOfMonth } from "date-fns"
import BarChartCard from "@/components/Admin-BarChartCard"
import type { GroupBy } from "@/components/Admin-BarChartCard"
import { useAdminSectionStore } from "@/store/useAdminSections"
import { chat_data } from "@/adminData"
import PieChartCard from "./Admin-PieChartCard"

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

type AdminDashboardProps = {
  user_data: User[]
  product_data: Product[]
  wishlist_data: Wishlist[]
  notification_data: Notification[]
  chat_data: Chat[]
}

function groupProductsBy(products: Product[], groupBy: GroupBy) {
  const counts: Record<string, number> = {}

  products.forEach((p) => {
    const date = p.listedAt
    let key = ""
    if (groupBy === "day") key = format(date, "yyyy-MM-dd")
    else if (groupBy === "week") key = format(startOfWeek(date), "yyyy-MM-dd")
    else if (groupBy === "month") key = format(startOfMonth(date), "yyyy-MM")
    counts[key] = (counts[key] || 0) + 1
  })

  return Object.entries(counts).map(([period, count]) => ({
    period,
    products: count,
  }))
}

const AdminDashboard = (
  { user_data, product_data, wishlist_data, notification_data }: AdminDashboardProps) => {

  const { openSection } = useAdminSectionStore();

  const [groupBy, setGroupBy] = useState<GroupBy>("month")

  // Prepare hostel data
  const hostelCounts: Record<number, number> = user_data.reduce((acc, user) => {
    if (!user.hostelNo) return acc
    acc[user.hostelNo] = (acc[user.hostelNo] || 0) + 1
    return acc
  }, {} as Record<number, number>)

  const userChartData = Object.entries(hostelCounts).map(([hostel, count]) => ({
    hostel: `Hostel ${hostel}`,
    students: count,
  }))
  console.log();
  console.log(userChartData);

  // Prepare product chart data
  const productChartData = groupProductsBy(product_data, groupBy)

  const allRatings = user_data.flatMap((u) => u.ratingsReceived.map(Number));

  const overallAverage =
    allRatings.reduce((sum, r) => sum + r, 0) / allRatings.length;

  return (
    <div className="h-full w-full">
      <div className="grid grid-cols-12 gap-4 h-full w-full">

        {!openSection && (<>
          <div className="col-span-4 flex justify-center items-center">
            <PieChartCard
              title="Total Users/Students"
              totalLabel={user_data.length}
              data={userChartData}
              xKey="hostel"
              yKey="students"
              footerDescription="Hostels"
              // configLabel="Number of Students"
              // tickFormatter={(value) => value.replace("Hostel ", "H-")}
            />
          </div>
          <div className="col-span-4 flex justify-center items-center">
            <BarChartCard
              title="Total Products Added"
              totalLabel={product_data.length}
              data={productChartData}
              xKey="period"
              yKey="products"
              colorVar="var(--chart-2)"
              configLabel="Products Added"
              groupByOptions={["day", "week", "month"]}
              groupBy={groupBy}
              onGroupByChange={setGroupBy}
            />
          </div>
        </>)} 



        {openSection == "users" && (
          <div className="col-span-12 h-full w-full">
            <div className="grid grid-cols-12 gap-4 h-full w-full items-center ">

              <div className="col-span-4 h-full flex justify-center items-center ">
                <BarChartCard
                  title="Total Users/Students"
                  totalLabel={user_data.length}
                  data={userChartData}
                  xKey="hostel"
                  yKey="students"
                  colorVar="var(--chart-1)"
                  configLabel="Number of Students"
                  tickFormatter={(value) => value.replace("Hostel ", "")}
                />
              </div>

              <div className="col-span-4 h-full flex justify-center items-center ">
                <BarChartCard
                  title="Users Added today / this week / this month : ..." />
              </div>

              <div className="col-span-4 h-full w-full flex justify-around items-center flex-col p-4">
                <div className="h-[75px] w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-4xl flex justify-center items-center flex-col">
                  <h4 className="text-center">Total messages sent : </h4>
                  <div>
                    <span className="font-bold">{chat_data.length}</span>
                  </div>
                </div>
                <div className="h-[75px] w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-4xl flex justify-center items-center flex-col">
                  <h4 className="text-center">Average Ratings across all users : </h4>
                  <div>
                    <span className="font-bold">{overallAverage}</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )
        }




        {openSection == "products" && (<>
          <div className="col-span-12 h-full w-full">
            <div className="grid grid-cols-12 gap-4 h-full w-full items-center ">

              <div className="col-span-4 h-full flex justify-center items-center ">
                <BarChartCard />
              </div>

              <div className="col-span-4 h-full flex justify-center items-center ">
                <BarChartCard />
              </div>

              <div className="col-span-4 h-full w-full flex justify-around items-center flex-col p-4">
                <div className="h-[75px] w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-4xl flex justify-center items-center flex-col">
                  <h4 className="text-center">total wishlisted items : </h4>
                  <div>
                    <span className="font-bold">{wishlist_data.length}</span>
                  </div>
                </div>
                <div className="h-[75px] w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-4xl flex justify-center items-center flex-col">
                  <h4 className="text-center font-normal">Most Wishlisted Item / Category : </h4>
                  <div>
                    <span className="font-bold">Calculator</span> / <span className="font-bold">Gadgets</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </>)
        }

      </div>

    </div >
  )
}

export default AdminDashboard
