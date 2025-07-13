// src/components/DashboardCharts.tsx
"use client";
import { ResponsivePie } from "@nivo/pie";
import { ResponsiveBar } from "@nivo/bar";

type Product = {
  category: string;
  price: number;
  rating: number;
};

interface DashboardChartsProps {
  products: Product[];
}

export default function DashboardCharts({ products }: DashboardChartsProps) {
 
  const categoryCounts = Object.values(
    products.reduce((acc: { [key: string]: { id: string; label: string; value: number } }, p) => {
      acc[p.category] = acc[p.category] || { id: p.category, label: p.category, value: 0 };
      acc[p.category].value += 1;
      return acc;
    }, {})
  );

 
  const priceBuckets = [
    { range: "$0-10", min: 0, max: 10 },
    { range: "$10-50", min: 10, max: 50 },
    { range: "$50-100", min: 50, max: 100 },
    { range: "$100-500", min: 100, max: 500 },
    { range: "$500+", min: 500, max: Infinity },
  ];
  const priceData = priceBuckets.map(bucket => ({
    range: bucket.range,
    count: products.filter(p => p.price >= bucket.min && p.price < bucket.max).length,
  }));


  const ratingData = Object.values(
    products.reduce((acc: { [key: string]: { category: string; ratingSum: number; count: number } }, p) => {
      acc[p.category] = acc[p.category] || { category: p.category, ratingSum: 0, count: 0 };
      acc[p.category].ratingSum += p.rating;
      acc[p.category].count += 1;
      return acc;
    }, {})
  ).map(c => ({
    category: c.category,
    avgRating: (c.ratingSum / c.count).toFixed(2),
  }));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      
      <div className="bg-black rounded-xl shadow p-4 h-100">
        <h3 className="font-semibold mb-2 text-black">Category Distribution</h3>
        <ResponsivePie
          data={categoryCounts}
          margin={{ top: 20, right: 20, bottom: 60, left: 20 }}
          innerRadius={0.5}
          padAngle={1}
          cornerRadius={5}
          colors={{ scheme: "greens" }}
          borderWidth={1}
          borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
          enableArcLabels={false}
          legends={[
            {
              anchor: "bottom",
              direction: "row",
              justify: false,
              translateY: 36,
              itemWidth: 80,
              itemHeight: 18,
              itemsSpacing: 0,
              symbolSize: 18,
              symbolShape: "circle",
            },
          ]}
        />
      </div>
      
      <div className="bg-white rounded-xl shadow p-4 h-100">
        <h3 className="font-semibold mb-2 text-black">Price Ranges</h3>
        <ResponsiveBar
          data={priceData}
          keys={["count"]}
          indexBy="range"
          margin={{ top: 20, right: 20, bottom: 40, left: 40 }}
          padding={0.4}
          colors={{ scheme: "greens" }}
          axisBottom={{ tickSize: 5, tickPadding: 5, legend: "Price Range", legendPosition: "middle", legendOffset: 32 }}
          axisLeft={{ tickSize: 5, tickPadding: 5, legend: "Products", legendPosition: "middle", legendOffset: -32 }}
          labelSkipWidth={12}
          labelSkipHeight={12}
          labelTextColor="#000000"
        />
      </div>
     
      <div className="bg-white rounded-xl shadow p-4 h-100">
        <h3 className="font-semibold mb-2 text-black">Avg. Rating by Category</h3>
        <ResponsiveBar
          data={ratingData}
          keys={["avgRating"]}
          indexBy="category"
          margin={{ top: 20, right: 20, bottom: 40, left: 40 }}
          padding={0.4}
          colors={{ scheme: "greens" }}
          axisBottom={{ tickSize: 5, tickPadding: 5, legend: "Category", legendPosition: "middle", legendOffset: 32 }}
          axisLeft={{ tickSize: 5, tickPadding: 5, legend: "Avg Rating", legendPosition: "middle", legendOffset: -32 }}
          labelSkipWidth={12}
          labelSkipHeight={12}
          labelTextColor="#222"
        />
      </div>
    </div>
  );
}
