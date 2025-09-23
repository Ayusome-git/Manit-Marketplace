import { useState } from "react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import { format, startOfWeek, startOfMonth } from "date-fns"

type GroupBy = "day" | "week" | "month"

import {
 Card,
 CardContent,
 CardDescription,
 CardFooter,
 CardHeader,
 CardTitle,
} from "@/components/ui/card"

import type { ChartConfig } from "@/components/ui/chart"

import {
 ChartContainer,
 ChartTooltip,
 ChartTooltipContent,
} from "@/components/ui/chart"

import { user_data } from "@/adminData"

export const description = "A bar chart"

//user
const hostelCounts: Record<number, number> = user_data.reduce((acc, user) => {
 if (!user.hostelNo) return acc; // skip if no hostel
 acc[user.hostelNo] = (acc[user.hostelNo] || 0) + 1;
 return acc;
}, {} as Record<number, number>);
// Step 2: Transform into chartData format
const chartData = Object.entries(hostelCounts).map(([hostel, count]) => ({
 hostel: `Hostel ${hostel}`,
 students: count,
}));

const chartConfig = {
 students: {
  label: "Number of Students",
  color: "var(--chart-1)",
 },
} satisfies ChartConfig


//products
function groupProductsBy(products: Product[], groupBy: GroupBy) {
 const counts: Record<string, number> = {}

 products.forEach((p) => {
  const date = p.listedAt // already a Date object

  let key = ""
  if (groupBy === "day") {
   key = format(date, "yyyy-MM-dd") // e.g. 2025-09-17
  } else if (groupBy === "week") {
   key = format(startOfWeek(date), "yyyy-MM-dd") // start of week
  } else if (groupBy === "month") {
   key = format(startOfMonth(date), "yyyy-MM") // month
  }

  counts[key] = (counts[key] || 0) + 1
 })

 return Object.entries(counts).map(([period, count]) => ({
  period,
  products: count,
 }))
}


type User = {
 userId: string;
 username: string;
 email: string;
 phoneNo: string;
 hostelNo: number;
 products: string[];
 ratingsGiven: string[];
 ratingsReceived: string[];
 wishlist: string[];
 notification: string[];
 senderUser: string[];
 receiverUser: string[];
 // add whatever fields your API returns
}

type Product = {
 productId: string;
 category: string;
 name: string;
 description: string;
 price: number;
 productCondition: string;
 viewCount: number;
 listedAt: Date;
 sellerId: string;
 // add more fields as needed
}

type AdminDashboardProps = {
 user_data: User[]
 product_data: Product[]
}

const AdminDashboard = ({ user_data, product_data }: AdminDashboardProps) => {

 const [groupBy, setGroupBy] = useState<GroupBy>("month")

 const productChartData = groupProductsBy(product_data, groupBy)

 return (
  <div className="flex gap-2">
   <Card className="h-[300px] w-[35%]">
    <CardHeader>
     <CardTitle><h4>Total users/students : {user_data.length}</h4></CardTitle>
     {/* <CardDescription></CardDescription> */}
    </CardHeader>
    <CardContent>
     <ChartContainer className="h-[180px] w-full" config={chartConfig}>
      <BarChart accessibilityLayer data={chartData}>
       <CartesianGrid vertical={false} />
       <XAxis
        dataKey="hostel"
        tickLine={false}
        tickMargin={10}
        axisLine={false}
        tickFormatter={(value) => value.replace("Hostel ", "H-")}
       />
       <ChartTooltip
        cursor={false}
        content={<ChartTooltipContent hideLabel />}
       />
       <Bar dataKey="students" fill="var(--chart-1)" radius={8} className="w-[10px]" />
      </BarChart>
     </ChartContainer>
    </CardContent>
   </Card>

   <Card className="h-[300px] w-[35%]">
    <CardHeader className="flex flex-row items-center justify-between">
     <CardTitle><h4>Total Products currently : {product_data.length}</h4></CardTitle>
     <select
      value={groupBy}
      onChange={(e) => setGroupBy(e.target.value as GroupBy)}
      className="border rounded px-2 py-1 text-sm"
     >
      <option value="day">Daily</option>
      <option value="week">Weekly</option>
      <option value="month">Monthly</option>
     </select>
    </CardHeader>
    <CardContent>
     <ChartContainer
      className="h-[180px] w-full"
      config={{ products: { label: "Products", color: "var(--chart-2)" } }}
     >
      <BarChart accessibilityLayer data={productChartData}>
       <CartesianGrid vertical={false} />
       <XAxis
        dataKey="period"
        tickLine={false}
        tickMargin={10}
        axisLine={false}
       />
       <ChartTooltip
        cursor={false}
        content={<ChartTooltipContent hideLabel />}
       />
       <Bar dataKey="products" fill="var(--chart-2)" radius={8} />
      </BarChart>
     </ChartContainer>
    </CardContent>
   </Card>
  </div>
 )
}

export default AdminDashboard