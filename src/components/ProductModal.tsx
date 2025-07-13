"use client";

import CustomModal from "./CustomModal";
import Image from "next/image";

type Review = {
  reviewerName: string;
  rating: number;
  comment: string;
};

type Product = {
  thumbnail: string;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  reviews?: Review[];
};

type ProductModalProps = {
  product: Product | null;
  onClose: () => void;
};

export default function ProductModal({ product, onClose }: ProductModalProps) {
  if (!product) return null;

  return (
    <CustomModal isOpen={!!product} onClose={onClose} contentLabel="Product Details">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Image Section */}
        <div className="relative w-full md:w-1/3 h-64 md:h-auto rounded-xl overflow-hidden shadow-lg border border-gray-200 dark:border-gray-700">
          <Image
            src={product.thumbnail}
            alt={product.title}
            fill
            style={{ objectFit: "cover" }}
            sizes="(max-width: 768px) 100vw, 33vw"
            priority={true}
            className="rounded-xl"
          />
        </div>

        {/* Details Section */}
        <div className="flex-1 flex flex-col">
          <h2 className="text-3xl font-extrabold mb-3 text-black dark:text-white tracking-tight">
            {product.title}
          </h2>

          <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed max-w-lg">
            {product.description}
          </p>

          <div className="flex flex-wrap items-center gap-4 mb-6">
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">
              ${product.price.toFixed(2)}
            </div>
            {product.discountPercentage > 0 && (
              <div className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300 px-3 py-1 rounded-full font-semibold text-sm">
                {product.discountPercentage}% OFF
              </div>
            )}
            <div className="flex items-center space-x-1 text-yellow-400 font-semibold">
              <svg
                className="w-5 h-5 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M10 15l-5.878 3.09 1.123-6.545L.49 6.91l6.561-.955L10 0l2.949 5.955 6.561.955-4.755 4.635 1.123 6.545z" />
              </svg>
              <span>{product.rating.toFixed(1)}</span>
            </div>
            <div
              className={`px-3 py-1 rounded-full font-semibold text-sm ${
                product.stock > 0
                  ? "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300"
                  : "bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-300"
              }`}
            >
              {product.stock > 0 ? "In Stock" : "Out of Stock"}
            </div>
          </div>

          <div className="mb-6 grid grid-cols-2 gap-x-8 gap-y-3 max-w-md text-gray-700 dark:text-gray-300 font-medium">
            <div>
              <span className="text-black dark:text-white font-semibold">Brand:</span> {product.brand}
            </div>
            <div>
              <span className="text-black dark:text-white font-semibold">Category:</span> {product.category}
            </div>
          </div>

          <h3 className="text-xl font-semibold mb-4 text-black dark:text-white border-b border-gray-300 dark:border-gray-700 pb-2">
            Reviews
          </h3>

         {product.reviews && product.reviews.length > 0 ? (
  <ul className="space-y-2 max-h-48 overflow-y-auto pr-1">
    {product.reviews.map((review, idx) => (
      <li key={idx} className="pb-2 border-b border-gray-200 last:border-b-0 flex flex-col">
        <div className="flex items-center justify-between mb-1">
          <span className="font-medium text-gray-800 dark:text-gray-100 text-sm">
            {review.reviewerName}
          </span>
          <span className="flex items-center text-yellow-500 text-xs font-semibold">
            <svg
              className="w-3.5 h-3.5 mr-1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M10 15l-5.878 3.09 1.123-6.545L.49 6.91l6.561-.955L10 0l2.949 5.955 6.561.955-4.755 4.635 1.123 6.545z" />
            </svg>
            {review.rating} ★
          </span>
        </div>
        <p className="text-gray-600 dark:text-gray-300 text-sm">{review.comment}</p>
      </li>
    ))}
  </ul>
) : (
  <p className="text-gray-500 dark:text-gray-400 italic">No reviews available.</p>
)}

        </div>
      </div>
    </CustomModal>
  );
}
