"use client";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import React from "react";
import { Bar, BarChart, XAxis, YAxis } from "recharts";

const AnalyticsChartCitys = () => {
  const chartData = [
    { month: "Sale", desktop: 186 },
    { month: "Casablanca", desktop: 305 },
    { month: "Rabat", desktop: 237 },
    { month: "Fes", desktop: 73 },
    { month: "Tanger", desktop: 209 },
    { month: "Nador", desktop: 214 },
  ];
  const chartConfig = {
    desktop: {
      label: "Desktop",
      color: "hsl(var(--chart-5))",
    },
  } satisfies ChartConfig;
  return (
    <div className="flex flex-col w-full">
      <h3 className="text-xl font-semibold mb-4">Top villes</h3>
      <div className="flex w-full bg-secondary border border-primary/15 p-4">
        <ChartContainer
          config={chartConfig}
          className="min-h-[350px] max-w-[500px]"
        >
          <BarChart
            accessibilityLayer
            data={chartData}
            layout="vertical"
            margin={{
              left: -20,
            }}
          >
            <XAxis type="number" dataKey="desktop" hide />
            <YAxis
              dataKey="month"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="desktop" fill="var(--color-desktop)" radius={5} />
          </BarChart>
        </ChartContainer>
      </div>
    </div>
  );
};

export default AnalyticsChartCitys;
