"use client"

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart"
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts"

const chartData = [
  { month: "January", wardA: 40, wardB: 24, wardC: 24 },
  { month: "February", wardA: 30, wardB: 13, wardC: 22 },
  { month: "March", wardA: 20, wardB: 78, wardC: 29 },
  { month: "April", wardA: 27, wardB: 39, wardC: 20 },
  { month: "May", wardA: 18, wardB: 48, wardC: 25 },
  { month: "June", wardA: 23, wardB: 38, wardC: 21 },
  { month: "July", wardA: 34, wardB: 43, wardC: 28 },
]

const chartConfig = {
  wardA: {
    label: "ICU",
    color: "hsl(var(--chart-1))",
  },
  wardB: {
    label: "Ward B",
    color: "hsl(var(--chart-2))",
  },
  wardC: {
    label: "Surgical",
    color: "hsl(var(--chart-3))",
  },
}

export default function AmTrendGraph() {
  return (
    <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
      <LineChart
        accessibilityLayer
        data={chartData}
        margin={{
          left: 12,
          right: 12,
        }}
      >
        <CartesianGrid vertical={false} />
        <YAxis
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tickFormatter={(value) => `${value}%`}
        />
        <XAxis
          dataKey="month"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Line
          dataKey="wardA"
          type="monotone"
          stroke="var(--color-wardA)"
          strokeWidth={2}
          dot={false}
        />
        <Line
          dataKey="wardB"
          type="monotone"
          stroke="var(--color-wardB)"
          strokeWidth={2}
          dot={false}
        />
        <Line
          dataKey="wardC"
          type="monotone"
          stroke="var(--color-wardC)"
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ChartContainer>
  )
}
