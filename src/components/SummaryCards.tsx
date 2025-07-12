export default function SummaryCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <div className="bg-gradient-to-br from-green-600 to-green-400 text-white rounded-xl p-6 shadow">
        <div className="text-lg font-semibold">Total Products</div>
        <div className="text-3xl font-bold mt-2">120</div>
      </div>
      <div className="bg-black text-green-400 rounded-xl p-6 shadow">
        <div className="text-lg font-semibold">Categories</div>
        <div className="text-3xl font-bold mt-2">8</div>
      </div>
      <div className="bg-white text-black rounded-xl p-6 shadow border border-green-100">
        <div className="text-lg font-semibold">Low Stock</div>
        <div className="text-3xl font-bold mt-2">5</div>
      </div>
      <div className="bg-green-100 text-green-700 rounded-xl p-6 shadow">
        <div className="text-lg font-semibold">Avg. Rating</div>
        <div className="text-3xl font-bold mt-2">4.2</div>
      </div>
    </div>
  );
}
