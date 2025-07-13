
import SummaryCards from "@/components/SummaryCards";
import DashboardCharts from "@/components/DashboardCharts";

async function fetchProducts() {
  const res = await fetch("https://dummyjson.com/products?limit=100");
  const data = await res.json();
  return data.products;
}

export default async function DashboardHome() {
  const products = await fetchProducts();

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8 text-black">Dashboard</h1>
      <SummaryCards products={products} />
      <DashboardCharts products={products} />
    </div>
  );
}
