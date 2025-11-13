import { useState } from "react"
import { format, startOfToday, startOfWeek, startOfMonth, parseISO } from "date-fns"
import BarChartCard from "@/components/Admin-BarChartCard"
import type { GroupBy } from "@/components/Admin-BarChartCard"
import PieChartCard from "./Admin-PieChartCard"
import { useAdminStore } from "@/store/useAdminStore"
import { Products } from "@/pages/Products"

type User = {
  userId: string
  username: string
  email: string
  phoneNo: number
  hostelNo: number
  profilePhoto?: string
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

type AdminDashboardProps = {
  user_data: User[]
  product_data: { products: Product[] }
  // wishlist_data: Wishlist[]
  // notification_data: Notification[]
  // chat_data: Chat[]
}

function groupProductsBy(products: Product[], groupBy: GroupBy) {
  const counts: Record<string, number> = {}

  products.forEach((p) => {
    if (!p.listedAt) return
    const date = new Date(p.listedAt)
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

function groupProductsByCategory(products: Product[]) {
  // explicitly type the accumulator
  const grouped: Record<string, number> = products.reduce((acc, product) => {
    const cat = product.category || "Uncategorized";
    acc[cat] = (acc[cat] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return Object.entries(grouped).map(([category, count]) => ({
    category,
    products: count,
  }));
}

// Group products by condition
function groupProductsByCondition(products: Product[]) {
  const grouped: Record<string, number> = products.reduce((acc, product) => {
    const condition = product.productCondition || "Unknown";
    acc[condition] = (acc[condition] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return Object.entries(grouped).map(([condition, count]) => ({
    condition,
    products: count,
  }));
}

// const conditionChartData = groupProductsByCondition(product_data?.products || []);

// Group products by category
// function groupProductsByCategory1(products: Product[]) {
//   const grouped: Record<string, number> = products.reduce((acc, product) => {
//     const category = product.category || "Uncategorized";
//     acc[category] = (acc[category] || 0) + 1;
//     return acc;
//   }, {} as Record<string, number>);

//   return Object.entries(grouped).map(([category, count]) => ({
//     category,
//     products: count,
//   }));
// }


const AdminDashboard = (
  { user_data, product_data }: AdminDashboardProps) => {

  console.log("user ", user_data)
  console.log("product  ", product_data)

  const { openSection } = useAdminStore();

  const [groupBy, setGroupBy] = useState<GroupBy>("month")

  // Prepare hostel data
  const hostelCounts: Record<string, number> = user_data.reduce((acc, user) => {
    const hostelLabel = user.hostelNo ? `Hostel ${user.hostelNo}` : "Unassigned";
    acc[hostelLabel] = (acc[hostelLabel] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Convert to array for chart
  const userChartData = Object.entries(hostelCounts).map(([hostel, count]) => ({
    hostel,
    students: count,
  }));

  // Prepare product chart data

  const productChartData2 = groupProductsByCategory(product_data?.products || []);

  const conditionChartData = groupProductsByCondition(product_data?.products || []);

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
            // tickFormatter={(value) =>
            //   value.replace("Hostel ", "H-").replace("Unassigned", "N/A")
            // }
            />
          </div>
          <div className="col-span-4 flex justify-center items-center">
            <BarChartCard
              title="Total Products Added"
              totalLabel={product_data?.products?.length || 0}
              data={productChartData2}
              xKey="category"
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

              <div className="col-span-4 h-full w-full flex justify-around items-center flex-col p-4">
                <div className="h-[75px] w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-4xl flex justify-center items-center flex-col">
                  <h4 className="text-center">Total Users : </h4>
                  <div>
                    <span className="font-bold">{user_data.length}</span>
                  </div>
                </div>
                <div className="h-[75px] w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-4xl flex justify-center items-center flex-col">
                  <h4 className="text-center">Users With Phone / Users Without Phone</h4>
                  <div>
                    <span className="font-bold">{user_data.filter(u => u.phoneNo).length} / {user_data.filter(u => !u.phoneNo).length}</span>
                  </div>
                </div>
                <div className="h-[75px] w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-4xl flex justify-center items-center flex-col">
                  <h4 className="text-center">Users with / without Profile Photo</h4>
                  <div>
                    <span className="font-bold">{user_data.filter(u => u.profilePhoto).length} / {user_data.filter(u => !u.profilePhoto).length}</span>
                  </div>
                </div>
              </div>

              <div className="col-span-4 h-full w-full flex justify-around items-center flex-col p-4">
                <div className="min-h-[120px] w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-4xl flex justify-center items-center flex-col">
                  <h4 className="text-center">Students per Hostel : </h4>
                  <div>
                    {Object.entries(
                      user_data.reduce((acc, u) => {
                        const hostel = u.hostelNo ? `Hostel ${u.hostelNo}` : "Unassigned";
                        acc[hostel] = (acc[hostel] || 0) + 1;
                        return acc;
                      }, {} as Record<string, number>)
                    ).map(([hostel, count]) => (
                      <div key={hostel}>{hostel}: {count}</div>
                    ))}
                  </div>
                </div>
                {/* <div className="h-[75px] w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-4xl flex justify-center items-center flex-col">
                  <h4 className="text-center">Average Ratings across all users : </h4>
                  <div>
                    <span className="font-bold">overallAverage</span>
                  </div>
                </div> */}
              </div>

            </div>
          </div>
        )
        }




        {openSection == "products" && (<>
          <div className="col-span-12 h-full w-full">
            <div className="grid grid-cols-12 gap-4 h-full w-full items-center ">

              <div className="col-span-4 h-full flex justify-center items-center ">
                <BarChartCard
                  title="Total Products Added"
                  totalLabel={product_data?.products?.length || 0}
                  data={productChartData2}
                  xKey="category"
                  yKey="products"
                  colorVar="var(--chart-2)"
                  configLabel="Products Added"
                  groupByOptions={["day", "week", "month"]}
                  groupBy={groupBy}
                  onGroupByChange={setGroupBy}
                />
              </div>

              <div className="col-span-4 h-full flex justify-center items-center ">
                <BarChartCard
                  title="Total Products Added"
                  totalLabel={product_data?.products?.length || 0}
                  data={conditionChartData}
                  xKey="condition"
                  yKey="products"
                  colorVar="var(--chart-2)"
                  configLabel="Products Added"
                  groupByOptions={["day", "week", "month"]}
                  groupBy={groupBy}
                  onGroupByChange={setGroupBy}
                />
              </div>

              {/* <div className="col-span-4 h-full w-full flex justify-around items-center flex-col p-4">
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
              </div> */}

            </div>
          </div>
        </>)
        }

      </div>

    </div >
  )
}

export default AdminDashboard
