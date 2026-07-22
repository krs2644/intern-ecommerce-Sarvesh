"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/hooks";
import { placeOrder } from "@/services/order.service";
import AuthGuard from "@/components/AuthGuard";
import CartItemCard from "@/components/CartItemCard";
import Spinner from "@/components/Spinner";
import Link from "next/link";

export default function CartPage() {
    const router = useRouter();
    const { isAuthenticated } = useAuth();
    const { cart, setCart, loading, refresh } = useCart();
    const [placing, setPlacing] = useState(false);
    const [removedIds, setRemovedIds] = useState<Set<number>>(new Set());

    const visibleItems = cart?.items.filter((i) => !removedIds.has(i.id)) ?? [];
    const total = Math.round(visibleItems.reduce((sum, i) => sum + i.product.price * i.quantity, 0) * 100) / 100;

    async function handlePlaceOrder() {
        if (!isAuthenticated) {
            router.push("/login");
            return;
        }

        setPlacing(true);
        try {
            await placeOrder();
            router.push("/orders");
        } catch (err) {
            alert(err instanceof Error ? err.message : "Failed to place order");
        } finally {
            setPlacing(false);
        }
    }

    function handleRemove(id: number) {
        setRemovedIds((prev) => new Set(prev).add(id));
    }

    function handleQuantityChange(id: number, newQuantity: number) {
        if (!cart) return;
        setCart({
            ...cart,
            items: cart.items.map((i) =>
                i.id === id ? { ...i, quantity: newQuantity } : i
            ),
        });
    }

    return (
        <AuthGuard>
            <main className="min-h-screen bg-slate-50 py-8">
                <div className="container">
                    <h1 className="mb-8 section-title">Shopping Cart</h1>

                    {loading ? (
                        <Spinner />
                    ) : !cart ? (
                        <div className="card p-10 text-center">
                            <p className="text-sm text-slate-500">Failed to load cart.</p>
                        </div>
                    ) : visibleItems.length === 0 ? (
                        <div className="card p-12 text-center">
                            <svg
                                className="mx-auto h-16 w-16 text-slate-300"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={1}
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                            </svg>
                            <h2 className="mt-4 text-lg font-semibold text-slate-900">Your cart is empty</h2>
                            <p className="mt-2 text-sm text-slate-500">
                                Looks like you haven&apos;t added anything to your cart yet.
                            </p>
                            <Link
                                href="/products"
                                className="btn-primary mt-6 inline-flex"
                            >
                                Browse Products
                            </Link>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                            <div className="space-y-4 lg:col-span-2">
                                {visibleItems.map((item) => (
                                    <CartItemCard
                                        key={item.id}
                                        item={item}
                                        onRemove={handleRemove}
                                        onQuantityChange={handleQuantityChange}
                                    />
                                ))}
                            </div>

                            <div className="lg:col-span-1">
                                <div className="card sticky top-24 p-6">
                                    <h3 className="text-lg font-semibold text-slate-900">Order Summary</h3>
                                    <div className="mt-4 space-y-3">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-slate-500">
                                                Subtotal ({visibleItems.length} item{visibleItems.length !== 1 ? "s" : ""})
                                            </span>
                                            <span className="font-medium text-slate-900">₹{total}</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-slate-500">Shipping</span>
                                            <span className="font-medium text-emerald-600">Free</span>
                                        </div>
                                        <div className="border-t border-slate-200 pt-3">
                                            <div className="flex justify-between">
                                                <span className="text-base font-semibold text-slate-900">Total</span>
                                                <span className="text-base font-bold text-slate-900">₹{total}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <button
                                        onClick={handlePlaceOrder}
                                        disabled={placing}
                                        className="btn-primary mt-6 w-full"
                                    >
                                        {placing ? "Placing Order..." : "Place Order"}
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </AuthGuard>
    );
}
