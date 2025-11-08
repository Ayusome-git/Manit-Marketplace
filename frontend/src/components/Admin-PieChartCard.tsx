import React from "react"
import { Pie, PieChart, Cell, Legend } from "recharts"
import {
 Card,
 CardContent,
 CardDescription,
 CardFooter,
 CardHeader,
 CardTitle,
} from "@/components/ui/card"
import {
 ChartContainer,
 ChartTooltip,
 ChartTooltipContent,
} from "@/components/ui/chart"

import type { ChartConfig } from "@/components/ui/chart"

export type GroupBy = "day" | "week" | "month" | null

type AdminPieChartCardProps<T> = {
 title?: string
 totalLabel: string | number
 data: T[]
 xKey: keyof T
 yKey: keyof T
 colors?: string[]
 showLegend?: boolean
 footerDescription: string
}

const defaultColors = [
 "var(--chart-1)",
 "var(--chart-2)",
 "var(--chart-3)",
 "var(--chart-4)",
 "var(--chart-5)",
]

const AdminPieChartCard = <T,>({
 title = "Pie Chart",
 totalLabel,
 data,
 xKey,
 yKey,
 colors,
 showLegend = true,
 footerDescription
}: AdminPieChartCardProps<T>) => {
 const nameKey = String(xKey)
 const valueKey = String(yKey)
 const colorScale = colors && colors.length ? colors : defaultColors

 // minimal chart config so ChartContainer can pick up color/labels if needed
 const chartConfig: ChartConfig = {
  [valueKey]: { label: String(yKey) },
 } as ChartConfig

 return (
  <Card className="h-[350px] w-[350px] border-2">
   <CardHeader className="flex flex-row items-center justify-between">
    <CardTitle >{title} : {totalLabel}</CardTitle>
   </CardHeader>

   <CardContent className="">
    <ChartContainer config={chartConfig} className="h-[220px] w-full">
     <PieChart>
      <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
      <Pie
       data={data as any}
       dataKey={valueKey}
       nameKey={nameKey}
       cx="50%"
       cy="50%"
       innerRadius={0}       // filled pie
       outerRadius="80%"
       startAngle={90}
       endAngle={-270}
       paddingAngle={0}
       labelLine={false}
       isAnimationActive={true}
      >
       {(data as any[]).map((entry, idx) => (
        <Cell
         key={`cell-${idx}`}
         fill={
          // prefer explicit `fill` on data, else use provided colorScale
          (entry && (entry as any).fill) || colorScale[idx % colorScale.length]
         }
        />
       ))}
      </Pie>

      {/* {showLegend && <Legend verticalAlign="bottom" height={24} />} */}
     </PieChart>
    </ChartContainer>
   </CardContent>

   {/* keep footer available for small notes; user can customize when using component */}
   <CardFooter className="flex-col text-sm">
    <div className="text-muted-foreground leading-none">
     {/* {description ?? "Showing distribution"} */}{footerDescription}
    </div>
   </CardFooter>
  </Card>
 )
}

export default AdminPieChartCard