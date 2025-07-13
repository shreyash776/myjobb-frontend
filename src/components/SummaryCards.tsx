
type Product = {
  category: string;
  stock: number;
  rating: number;
};

interface SummaryCardsProps {
  products: Product[];
}

export default function SummaryCards({ products }: SummaryCardsProps) {
  const total = products.length;
  const categories = new Set(products.map(p => p.category)).size;
  const lowStock = products.filter(p => p.stock < 10).length;
  const avgRating = (
    products.reduce((sum, p) => sum + p.rating, 0) / total
  ).toFixed(2);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div className="bg-gradient-to-br from-green-600 to-green-400 text-white rounded-xl p-6 shadow">
        <div className="text-lg font-semibold">Total Products</div>
        <div className="text-3xl font-bold mt-2">{total}</div>
      </div>
      <div className="bg-black text-green-400 rounded-xl p-6 shadow">
        <div className="text-lg font-semibold">Categories</div>
        <div className="text-3xl font-bold mt-2">{categories}</div>
      </div>
      <div className="bg-white text-black rounded-xl p-6 shadow border border-green-100">
        <div className="text-lg font-semibold">Low Stock</div>
        <div className="text-3xl font-bold mt-2">{lowStock}</div>
      </div>
      <div className="bg-green-100 text-green-700 rounded-xl p-6 shadow">
        <div className="text-lg font-semibold">Avg. Rating</div>
        <div className="text-3xl font-bold mt-2">{avgRating}</div>
      </div>
    </div>
  );
}
