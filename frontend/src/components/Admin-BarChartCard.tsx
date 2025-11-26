import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

import type { ChartConfig } from "@/components/ui/chart"

export type GroupBy = "day" | "week" | "month" | null

type BarChartCardProps<T> = {
  title: string
  totalLabel: string | number
  data: T[]
  xKey: keyof T
  yKey: keyof T
  colorVar?: string
  configLabel?: string
  configColorVar?: string
  tickFormatter?: (value: string) => string
  groupByOptions?: GroupBy[]
  groupBy?: GroupBy
  onGroupByChange?: (value: GroupBy) => void
}

const BarChartCard = <T,>({
  title,
  totalLabel,
  data,
  xKey,
  yKey,
  colorVar = "var(--chart-1)",
  configLabel,
  configColorVar,
  tickFormatter,
  groupByOptions,
  groupBy,
  onGroupByChange,
}: BarChartCardProps<T>) => {
  const chartConfig: ChartConfig = {
    [yKey]: {
      label: configLabel || String(yKey),
      color: configColorVar || colorVar,
    },
  } as ChartConfig

  return (
    <Card className="h-[350px] w-[350px]">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>
          <h4>{title} : {totalLabel}</h4>
        </CardTitle>
        {groupByOptions && (
          <select
            value={groupBy ?? ""}
            onChange={(e) => onGroupByChange?.(e.target.value as GroupBy)}
            className="border rounded px-2 py-1 text-sm"
          >
            {groupByOptions?.map((option) => (
              <option key={option ?? "none"} value={option ?? ""}>
                {option ? option.charAt(0).toUpperCase() + option.slice(1) : "None"}
              </option>
            ))}
          </select>
        )}
      </CardHeader>
      <CardContent>
        <ChartContainer className="h-[220px] w-full" config={chartConfig}>
          <BarChart accessibilityLayer data={data}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey={xKey as string}
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={tickFormatter}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey={yKey as string} fill={colorVar} radius={8} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

export default BarChartCard
