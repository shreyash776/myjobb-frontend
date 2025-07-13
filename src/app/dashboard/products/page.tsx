"use client";

import { useEffect, useState } from "react";
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
  [key: string]: unknown;
};

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(false);
  const [totalProducts, setTotalProducts] = useState(0);

  useEffect(() => {
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
  }, [page]);

  const totalPages = Math.ceil(totalProducts / PRODUCTS_PER_PAGE);

  return (
    <div className="px-4 sm:px-8 md:px-12 lg:px-16 py-8">
      <h1 className="text-3xl font-bold mb-8 text-black">Products</h1>

      {loading ? (
        <div className="text-center text-green-700 font-semibold">Loading...</div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onClick={() => setSelectedProduct(product)}
              />
            ))}
          </div>

          {/* Pagination */}
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
