"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/hooks";
import { placeOrder } from "@/services/order.service";
import AuthGuard from "@/components/auth/AuthGuard";
import CartItemCard from "@/components/cart/CartItemCard";
import Spinner from "@/components/ui/Spinner";

export default function CartPage() {
    const router = useRouter();
    const { isAuthenticated } = useAuth();
    const { cart, total, loading, refresh } = useCart();
    const [placing, setPlacing] = useState(false);

    async function handlePlaceOrder() {
        if (!isAuthenticated) {
            router.push("/login");
            return;
        }

        setPlacing(true);
        try {
            await placeOrder();
            alert("Order placed successfully!");
            router.push("/orders");
        } catch (err) {
            alert(err instanceof Error ? err.message : "Failed to place order");
        } finally {
            setPlacing(false);
        }
    }

    return (
        <AuthGuard>
            <main className="min-h-screen bg-gradient-to-br from-black via-slate-950 to-blue-950 p-10">
                <h1 className="mb-10 text-4xl font-bold text-white">Shopping Cart</h1>

                {loading ? (
                    <Spinner />
                ) : !cart ? (
                    <p className="text-gray-400">Failed to load cart.</p>
                ) : (
                    <>
                        <div className="space-y-6">
                            {cart.items.length === 0 && (
                                <h2 className="text-xl text-gray-300">Cart is Empty</h2>
                            )}

                            {cart.items.map((item) => (
                                <CartItemCard
                                    key={item.id}
                                    item={item}
                                    onRefresh={refresh}
                                />
                            ))}
                        </div>

                        <div className="glass-card mt-10 flex items-center justify-between p-8">
                            <h2 className="text-3xl font-bold text-white">Total</h2>
                            <h2 className="text-3xl font-bold text-green-400">₹ {total}</h2>
                        </div>

                        {cart.items.length > 0 && (
                            <div className="mt-10 text-right">
                                <button
                                    onClick={handlePlaceOrder}
                                    disabled={placing}
                                    className="rounded-xl bg-blue-700 px-8 py-4 text-xl font-semibold text-white hover:bg-blue-800 disabled:opacity-50"
                                >
                                    {placing ? "Placing Order..." : "Place Order"}
                                </button>
                            </div>
                        )}
                    </>
                )}
            </main>
        </AuthGuard>
    );
}
