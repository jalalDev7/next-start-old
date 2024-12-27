"use client";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import React from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

const AnalyticsChartAnnual = () => {
  const chartData = [
    { month: "Janvier", desktop: 186, mobile: 80 },
    { month: "Fevrier", desktop: 305, mobile: 200 },
    { month: "Mars", desktop: 237, mobile: 120 },
    { month: "Avril", desktop: 73, mobile: 190 },
    { month: "Mai", desktop: 209, mobile: 130 },
    { month: "Juin", desktop: 214, mobile: 140 },
    { month: "Juillet", desktop: 214, mobile: 140 },
    { month: "Aout", desktop: 254, mobile: 130 },
    { month: "September", desktop: 254, mobile: 150 },
    { month: "October", desktop: 284, mobile: 180 },
    { month: "November", desktop: 264, mobile: 160 },
    { month: "December", desktop: 214, mobile: 110 },
  ];
  const chartConfig = {
    desktop: {
      label: "Desktop",
      color: "hsl(var(--chart-1))",
    },
    mobile: {
      label: "Mobile",
      color: "hsl(var(--chart-2))",
    },
  } satisfies ChartConfig;
  return (
    <div className="flex flex-col w-full">
      <h2 className="text-xl font-semibold mb-4">Charte graphique annual</h2>
      <ChartContainer
        config={chartConfig}
        className="h-[350px] bg-secondary border border-primary/15"
      >
        <BarChart accessibilityLayer data={chartData}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="month"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent indicator="dashed" />}
          />
          <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
          <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
        </BarChart>
      </ChartContainer>
    </div>
  );
};

export default AnalyticsChartAnnual;
