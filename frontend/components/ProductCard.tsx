"use client";

import { useState } from "react";
import { addToCart } from "@/services/cart.service";
import { Product } from "@/types";
import Link from "next/link";

type Props = {
    product: Product;
};

export default function ProductCard({ product }: Props) {
    const [added, setAdded] = useState(false);
    const [loading, setLoading] = useState(false);

    async function handleAddToCart() {
        if (added || loading) return;
        setLoading(true);
        try {
            await addToCart(product.id);
            setAdded(true);
            setTimeout(() => setAdded(false), 2000);
        } catch (err) {
            alert(err instanceof Error ? err.message : "Failed to add to cart");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="group card-hover overflow-hidden">
            <Link href={`/products/${product.id}`} className="block">
                <div className="relative overflow-hidden">
                    <img
                        src={product.thumbnail}
                        alt={product.title}
                        className="h-52 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    {product.discountPercentage && product.discountPercentage > 0 && (
                        <span className="absolute left-3 top-3 badge-danger">
                            -{product.discountPercentage}%
                        </span>
                    )}
                </div>
            </Link>

            <div className="p-4">
                <p className="text-xs font-medium uppercase tracking-wider text-blue-600">
                    {product.brand || "No Brand"}
                </p>

                <Link href={`/products/${product.id}`}>
                    <h3 className="mt-1 line-clamp-2 text-sm font-semibold text-slate-900 group-hover:text-blue-600">
                        {product.title}
                    </h3>
                </Link>

                <p className="mt-0.5 text-xs text-slate-500">{product.category}</p>

                <div className="mt-3 flex items-center justify-between">
                    <div className="flex items-baseline gap-2">
                        <span className="text-lg font-bold text-slate-900">
                            ₹{product.price}
                        </span>
                        {product.discountPercentage && product.discountPercentage > 0 && (
                            <span className="text-xs text-slate-400 line-through">
                                ₹{Math.round(product.price / (1 - product.discountPercentage / 100))}
                            </span>
                        )}
                    </div>
                    <div className="flex items-center gap-1">
                        <svg className="h-4 w-4 fill-amber-400" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span className="text-sm font-medium text-slate-700">
                            {product.rating ?? "N/A"}
                        </span>
                    </div>
                </div>

                <div className="mt-1">
                    {product.stock > 0 ? (
                        <span className="badge-success">In Stock ({product.stock})</span>
                    ) : (
                        <span className="badge-danger">Out of Stock</span>
                    )}
                </div>

                <button
                    onClick={handleAddToCart}
                    disabled={loading || product.stock === 0}
                    className={`mt-4 w-full rounded-lg px-4 py-2.5 text-sm font-semibold transition-all duration-200 ${
                        added
                            ? "bg-emerald-500 text-white"
                            : product.stock === 0
                                ? "cursor-not-allowed bg-slate-100 text-slate-400"
                                : "bg-blue-600 text-white hover:bg-blue-700 hover:shadow-md"
                    }`}
                >
                    {loading ? (
                        <span className="inline-flex items-center gap-2">
                            <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                            </svg>
                            Adding...
                        </span>
                    ) : added ? (
                        <span className="inline-flex items-center gap-2">
                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                            Added to Cart
                        </span>
                    ) : (
                        <span className="inline-flex items-center gap-2">
                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
                            </svg>
                            Add to Cart
                        </span>
                    )}
                </button>
            </div>
        </div>
    );
}
