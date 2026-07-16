"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

import {
    getCart,
    getCartTotal,
    increaseQuantity,
    decreaseQuantity,
    removeItem,
} from "@/services/cart.service";
import { placeOrder } from "@/services/order.service";

export default function CartPage() {
    const router = useRouter();
    const { isAuthenticated } = useAuth();
    const [cart, setCart] = useState<any>(null);
    const [total, setTotal] = useState(0);
    const [placing, setPlacing] = useState(false);

    async function loadCart() {
        try {
            const cartData = await getCart();
            const totalData = await getCartTotal();

            setCart(cartData);
            setTotal(totalData);
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        loadCart();
    }, []);

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
        } catch (err: any) {
            alert(err.message || "Failed to place order");
        } finally {
            setPlacing(false);
        }
    }

    if (!cart) {
        return (
            <main className="min-h-screen bg-gradient-to-br from-black via-slate-950 to-blue-950 p-10">
                <h1 className="text-white text-4xl">
                    Loading Cart...
                </h1>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-gradient-to-br from-black via-slate-950 to-blue-950 p-10">

            <h1 className="mb-10 text-4xl font-bold text-white">
                Shopping Cart
            </h1>

            <div className="space-y-6">

                {cart.items.length === 0 && (
                    <h2 className="text-xl text-gray-300">
                        Cart is Empty
                    </h2>
                )}

                {cart.items.map((item: any) => (

                    <div
                        key={item.id}
                        className="glass-card flex items-center justify-between p-6"
                    >

                        <div className="flex items-center gap-5">

                            <img
                                src={item.product.thumbnail}
                                className="h-24 w-24 rounded-lg"
                            />

                            <div>

                                <h2 className="text-xl font-bold text-white">
                                    {item.product.title}
                                </h2>

                                <p className="text-gray-400">
                                    ₹ {item.product.price}
                                </p>

                                <p className="text-white">
                                    Qty : {item.quantity}
                                </p>

                            </div>

                        </div>

                        <div className="flex gap-3">

                            <button
                                onClick={async () => {
                                    await decreaseQuantity(item.id);
                                    loadCart();
                                }}
                                className="rounded bg-red-600 px-4 py-2 text-white"
                            >
                                -
                            </button>

                            <button
                                onClick={async () => {
                                    await increaseQuantity(item.id);
                                    loadCart();
                                }}
                                className="rounded bg-green-600 px-4 py-2 text-white"
                            >
                                +
                            </button>

                            <button
                                onClick={async () => {
                                    await removeItem(item.id);
                                    loadCart();
                                }}
                                className="rounded bg-gray-700 px-4 py-2 text-white"
                            >
                                Remove
                            </button>

                        </div>

                    </div>

                ))}

            </div>

            <div className="glass-card mt-10 flex items-center justify-between p-8">

                <h2 className="text-3xl font-bold text-white">
                    Total
                </h2>

                <h2 className="text-3xl font-bold text-green-400">
                    ₹ {total}
                </h2>

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

        </main>
    );
}
