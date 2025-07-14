"use client";

import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import ProductCard from "@/components/ProductCard";
import ProductModal from "@/components/ProductModal";

const PRODUCTS_PER_PAGE = 12;

type Product = {
  id: number;
  title: string;
  thumbnail: string;
  price: number;
  rating: number;
  stock: number;
  description: string;
  discountPercentage: number;
  brand: string;
  category: string;
  reason?: string;
  [key: string]: unknown;
};

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(false);
  const [totalProducts, setTotalProducts] = useState(0);
  const [query, setQuery] = useState("");
  const [aiSearchMode, setAiSearchMode] = useState(false);

  useEffect(() => {
    if (aiSearchMode) return;

    async function fetchProducts() {
      setLoading(true);
      const res = await fetch(
        `https://dummyjson.com/products?limit=${PRODUCTS_PER_PAGE}&skip=${(page - 1) * PRODUCTS_PER_PAGE}`
      );
      const data = await res.json();
      setProducts(data.products);
      setTotalProducts(data.total);
      setLoading(false);
    }

    fetchProducts();
  }, [page, aiSearchMode]);

  const handleAISearch = async () => {
    const trimmedQuery = query.trim();
    if (!trimmedQuery) {
      handleClearSearch();
      return;
    }

    setLoading(true);
    setAiSearchMode(true);

    try {
      const res = await fetch("http://localhost:5000/api/recommend", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: trimmedQuery }),
      });

      const data = await res.json();
      setProducts(data.recommendations);
    } catch (error) {
      console.error("AI Search failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleClearSearch = () => {
    setQuery("");
    setAiSearchMode(false);
    setPage(1);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleAISearch();
    }
  };

  const totalPages = Math.ceil(totalProducts / PRODUCTS_PER_PAGE);

  return (
    <div className="px-4 sm:px-8 md:px-12 lg:px-16 py-8">
      <h1 className="text-3xl font-bold mb-6 text-black">
        {aiSearchMode ? "AI Recommendations" : "Products"}
      </h1>

      
    <div className="flex justify-center mb-8">
  <div className="relative w-full text-black max-w-2xl">
    <input
      type="text"
      placeholder="Search with AI (e.g. long-lasting lipstick under $20)"
      value={query}
      onChange={(e) => {
        setQuery(e.target.value);
        if (e.target.value.trim() === "") {
          handleClearSearch();
        }
      }}
      onKeyDown={handleKeyDown}
      className="w-full pl-5 pr-12 py-3 text-base border border-gray-300 rounded-full shadow focus:outline-none focus:ring-2 focus:ring-green-500"
    />
    <button
      onClick={handleAISearch}
      className="absolute inset-y-0 right-4 flex items-center justify-center text-green-600 hover:text-green-800"
    >
      <FaSearch size={18} />
    </button>
  </div>
</div>

        

      {loading ? (
        <div className="text-center text-green-700 font-semibold">Loading...</div>
      ) : products.length === 0 ? (
        <div className="text-center text-gray-500 italic">
          {aiSearchMode
            ? "No products found matching your query."
            : "No products available."}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <div key={product.id} className="relative">
                <ProductCard
                  product={product}
                  onClick={() => setSelectedProduct(product)}
                />
                {aiSearchMode && product.reason && (
                  <div className="mt-2 text-sm text-gray-600 italic">
                    AI: {product.reason}
                  </div>
                )}
              </div>
            ))}
          </div>

          {!aiSearchMode && (
            <div className="flex justify-center mt-8 space-x-3">
              <button
                onClick={() => setPage((p) => Math.max(p - 1, 1))}
                disabled={page === 1}
                className="px-4 py-2 bg-green-600 text-white rounded-full disabled:bg-gray-300"
              >
                Previous
              </button>
              <span className="flex items-center text-black font-semibold">
                Page {page} of {totalPages}
              </span>
              <button
                onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                disabled={page === totalPages}
                className="px-4 py-2 bg-green-600 text-white rounded-full disabled:bg-gray-300"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}

      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
}
