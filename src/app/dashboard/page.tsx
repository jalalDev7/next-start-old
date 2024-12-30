import React from "react";

import Analytics from "@/components/dashboard/home/Analytics";
import AnalyticsChartAnnual from "@/components/dashboard/home/AnalyticsChartAnnual";
import AnalyticsChartCitys from "@/components/dashboard/home/AnalyticsChartCitys";
import AnalyticsVisitorsSource from "@/components/dashboard/home/AnalyticsVisitorsSource";
import AnalyticsCars from "@/components/dashboard/home/AnalyticsCars";

const page = async () => {
  return (
    <>
      <Analytics />
      <AnalyticsChartAnnual />
      <div className="flex flex-row w-full justify-between gap-4 ">
        <AnalyticsCars />
        <AnalyticsChartCitys />
        <AnalyticsVisitorsSource />
      </div>
    </>
  );
};

export default page;
