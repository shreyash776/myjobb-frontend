"use client";

import Image from "next/image";


type Product = {
  thumbnail: string;
  title: string;
  price: number;
  rating: number;
  stock: number;
};

type ProductCardProps = {
  product: Product;
  onClick: () => void;
};

export default function ProductCard({ product, onClick }: ProductCardProps) {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition p-4 flex flex-col"
    >
      <Image
        src={product.thumbnail}
        alt={product.title}
        width={200}   
        height={200}  
        className="h-48 w-full object-cover rounded-md mb-4"
        loading="lazy"
      />
      <h2 className="text-lg font-semibold text-black truncate">{product.title}</h2>
      <p className="text-green-700 font-bold mt-1">${product.price.toFixed(2)}</p>
      <div className="flex items-center mt-2 space-x-2">
        <span className="text-yellow-400 font-semibold">{product.rating.toFixed(1)}</span>
        <svg
          className="w-4 h-4 fill-yellow-400"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path d="M10 15l-5.878 3.09 1.123-6.545L.49 6.91l6.561-.955L10 0l2.949 5.955 6.561.955-4.755 4.635 1.123 6.545z" />
        </svg>
        <span className={`text-sm ${product.stock > 0 ? "text-green-600" : "text-red-600"}`}>
          {product.stock > 0 ? "In Stock" : "Out of Stock"}
        </span>
      </div>
    </div>
  );
}
