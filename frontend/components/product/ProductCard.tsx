"use client";

import { addToCart } from "@/services/cart.service";
import Link from "next/link";

type Product = {
    id: number;
    title: string;
    description: string;
    category: string;
    brand?: string;
    price: number;
    discountPercentage?: number;
    rating?: number;
    stock: number;
    thumbnail: string;
};

type Props = {
    product: Product;
};

export default function ProductCard({ product }: Props) {
    return (
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-lg">

            {/* Product Image */}
            <img
                src={product.thumbnail}
                alt={product.title}
                className="h-40 w-full object-cover"
            />

            {/* Card Body */}
            <div className="p-4">

                {/* Brand */}
                <p className="text-xs uppercase tracking-wide text-blue-600">
                    {product.brand || "No Brand"}
                </p>

                {/* Product Title */}
                <h2 className="mt-1 line-clamp-2 text-base font-bold text-gray-900">
                    {product.title}
                </h2>

                {/* Category */}
                <p className="mt-0.5 text-xs text-gray-500">
                    {product.category}
                </p>

                {/* Price & Rating */}
                <div className="mt-3 flex items-center justify-between">

                    <p className="text-lg font-bold text-green-600">
                        ₹ {product.price}
                    </p>

                    <span className="rounded bg-yellow-400 px-2 py-0.5 text-xs font-semibold text-black">
                        ⭐ {product.rating ?? "N/A"}
                    </span>

                </div>

                {/* Stock */}
                <p className="mt-2 text-xs text-gray-500">
                    Stock: {product.stock}
                </p>

                {/* Buttons */}
                <div className="mt-4 flex gap-2">

                    <Link
                        href={`/products/${product.id}`}
                        className="flex-1 rounded-lg border border-blue-600 bg-white px-3 py-1.5 text-center text-sm font-semibold text-blue-600 transition hover:bg-blue-50"
                    >
                        View Details
                    </Link>

                    <button
                        onClick={async () => {
                            await addToCart(product.id);
                            alert("Added to cart");
                        }}
                        className="rounded-lg bg-green-600 px-3 py-1.5 text-sm font-semibold text-white hover:bg-green-700"
                    >
                        Add To Cart
                    </button>

                </div>

            </div>

        </div>
    );
}
