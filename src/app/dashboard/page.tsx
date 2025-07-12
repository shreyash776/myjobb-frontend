import SummaryCards from "@/components/SummaryCards";
import AnalyticsCharts from "@/components/AnalyticsCharts";

export default function DashboardHome() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8 text-black">Dashboard</h1>
      <SummaryCards />
      <div className="mt-10">
        <AnalyticsCharts />
      </div>
    </div>
  );
}
