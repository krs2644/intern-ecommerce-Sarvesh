"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { useProduct } from "@/hooks";
import { addToCart } from "@/services/cart.service";
import Link from "next/link";
import Spinner from "@/components/ui/Spinner";
import ErrorMessage from "@/components/ui/ErrorMessage";

export default function ProductDetailPage() {
    const { id } = useParams();
    const { product, loading, error } = useProduct(Number(id));
    const [added, setAdded] = useState(false);
    const [adding, setAdding] = useState(false);

    async function handleAddToCart() {
        if (added || adding) return;
        setAdding(true);
        try {
            await addToCart(product!.id);
            setAdded(true);
            setTimeout(() => setAdded(false), 2000);
        } catch (err) {
            alert(err instanceof Error ? err.message : "Failed to add to cart");
        } finally {
            setAdding(false);
        }
    }

    if (loading) {
        return (
            <main className="min-h-screen bg-slate-50 py-12">
                <Spinner />
            </main>
        );
    }

    if (error || !product) {
        return (
            <main className="flex min-h-screen flex-col items-center justify-center bg-slate-50">
                <ErrorMessage message={error || "Product not found"} />
                <Link href="/products" className="mt-4 text-sm font-medium text-blue-600 hover:underline">
                    ← Back to Products
                </Link>
            </main>
        );
    }

    const originalPrice = product.discountPercentage
        ? Math.round(product.price / (1 - product.discountPercentage / 100))
        : null;

    return (
        <main className="min-h-screen bg-slate-50 py-8">
            <div className="container">
                <Link
                    href="/products"
                    className="mb-6 inline-flex items-center gap-1 text-sm font-medium text-slate-600 hover:text-blue-600"
                >
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                    </svg>
                    Back to Products
                </Link>

                <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                    <div className="space-y-4">
                        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
                            <img
                                src={product.thumbnail}
                                alt={product.title}
                                className="h-[400px] w-full object-cover"
                            />
                        </div>
                        {product.images && product.images.length > 0 && (
                            <div className="grid grid-cols-4 gap-3">
                                {product.images.slice(0, 4).map((img, i) => (
                                    <img
                                        key={i}
                                        src={img}
                                        alt={`${product.title} ${i + 1}`}
                                        className="h-20 w-full rounded-lg border border-slate-200 object-cover"
                                    />
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="space-y-6">
                        <div>
                            <p className="text-xs font-medium uppercase tracking-wider text-blue-600">
                                {product.brand || "No Brand"}
                            </p>
                            <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
                                {product.title}
                            </h1>
                            <p className="mt-1 text-sm text-slate-500">{product.category}</p>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="flex items-center gap-1">
                                {[...Array(5)].map((_, i) => (
                                    <svg
                                        key={i}
                                        className={`h-5 w-5 ${i < Math.round(product.rating ?? 0) ? "fill-amber-400" : "fill-slate-200"}`}
                                        viewBox="0 0 20 20"
                                    >
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                ))}
                            </div>
                            <span className="text-sm font-medium text-slate-600">
                                {product.rating ?? "N/A"} rating
                            </span>
                        </div>

                        <div className="flex items-baseline gap-3">
                            <span className="text-3xl font-bold text-slate-900">₹{product.price}</span>
                            {originalPrice && (
                                <span className="text-lg text-slate-400 line-through">₹{originalPrice}</span>
                            )}
                            {product.discountPercentage && product.discountPercentage > 0 && (
                                <span className="badge-danger">{product.discountPercentage}% off</span>
                            )}
                        </div>

                        <p className="text-sm leading-relaxed text-slate-600">{product.description}</p>

                        <div className="flex items-center gap-4">
                            {product.stock > 0 ? (
                                <span className="badge-success">In Stock — {product.stock} units</span>
                            ) : (
                                <span className="badge-danger">Out of Stock</span>
                            )}
                        </div>

                        <div className="flex gap-3 pt-4">
                            <button
                                onClick={handleAddToCart}
                                disabled={adding || product.stock === 0}
                                className={`flex-1 rounded-lg px-6 py-3 text-sm font-semibold transition-all duration-200 ${
                                    added
                                        ? "bg-emerald-500 text-white"
                                        : product.stock === 0
                                            ? "cursor-not-allowed bg-slate-100 text-slate-400"
                                            : "bg-blue-600 text-white hover:bg-blue-700 hover:shadow-md"
                                }`}
                            >
                                {adding ? (
                                    <span className="inline-flex items-center gap-2">
                                        <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                        </svg>
                                        Adding...
                                    </span>
                                ) : added ? (
                                    <span className="inline-flex items-center gap-2">
                                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                        </svg>
                                        Added to Cart
                                    </span>
                                ) : (
                                    <span className="inline-flex items-center gap-2">
                                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
                                        </svg>
                                        Add to Cart
                                    </span>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
