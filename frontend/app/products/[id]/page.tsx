"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getProduct } from "@/services/product.service";
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
    images: string[];
};

export default function ProductDetailPage() {
    const { id } = useParams();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function loadProduct() {
            try {
                const data = await getProduct(Number(id));
                setProduct(data);
            } catch (err) {
                setError("Product not found");
            } finally {
                setLoading(false);
            }
        }
        loadProduct();
    }, [id]);

    if (loading) {
        return (
            <main className="flex min-h-screen items-center justify-center bg-white">
                <h1 className="text-3xl font-bold text-gray-900">Loading...</h1>
            </main>
        );
    }

    if (error || !product) {
        return (
            <main className="flex min-h-screen flex-col items-center justify-center bg-white">
                <h1 className="text-3xl font-bold text-gray-900">{error || "Product not found"}</h1>
                <Link href="/products" className="mt-4 text-blue-600 hover:underline">
                    Back to Products
                </Link>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-white p-10">
            <Link href="/products" className="mb-6 inline-block text-blue-600 hover:underline">
                &larr; Back to Products
            </Link>

            <div className="flex flex-col gap-10 lg:flex-row">
                {/* Images */}
                <div className="lg:w-1/2">
                    <img
                        src={product.thumbnail}
                        alt={product.title}
                        className="w-full rounded-xl object-cover"
                    />
                    {product.images && product.images.length > 0 && (
                        <div className="mt-4 grid grid-cols-4 gap-2">
                            {product.images.map((img, i) => (
                                <img
                                    key={i}
                                    src={img}
                                    alt={`${product.title} ${i + 1}`}
                                    className="h-24 w-full rounded-lg object-cover"
                                />
                            ))}
                        </div>
                    )}
                </div>

                {/* Details */}
                <div className="lg:w-1/2">
                    <p className="text-sm uppercase tracking-wide text-blue-600">
                        {product.brand || "No Brand"}
                    </p>
                    <h1 className="mt-2 text-4xl font-bold text-gray-900">{product.title}</h1>
                    <p className="mt-2 text-gray-500">{product.category}</p>

                    <div className="mt-6 flex items-center gap-4">
                        <p className="text-3xl font-bold text-green-600">₹ {product.price}</p>
                        {product.discountPercentage && (
                            <span className="rounded-lg bg-red-100 px-3 py-1 text-sm font-semibold text-red-600">
                                -{product.discountPercentage}%
                            </span>
                        )}
                        <span className="rounded-lg bg-yellow-400 px-3 py-1 text-sm font-semibold text-black">
                            ⭐ {product.rating ?? "N/A"}
                        </span>
                    </div>

                    <p className="mt-6 text-gray-700 leading-relaxed">{product.description}</p>

                    <p className="mt-4 text-sm text-gray-500">
                        Stock: {product.stock > 0 ? product.stock : "Out of stock"}
                    </p>

                    <button
                        onClick={async () => {
                            await addToCart(product.id);
                            alert("Added to cart");
                        }}
                        className="mt-8 rounded-xl bg-green-600 px-8 py-3 font-semibold text-white hover:bg-green-700"
                    >
                        Add To Cart
                    </button>
                </div>
            </div>
        </main>
    );
}
