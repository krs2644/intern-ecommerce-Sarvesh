"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { getOrders } from "@/services/order.service";

type OrderItem = {
    id: number;
    quantity: number;
    price: number;
    product: {
        id: number;
        title: string;
        thumbnail: string;
    };
};

type Order = {
    id: number;
    totalPrice: number;
    status: string;
    createdAt: string;
    orderItems: OrderItem[];
};

export default function OrdersPage() {
    const router = useRouter();
    const { isAuthenticated } = useAuth();
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!isAuthenticated) {
            router.push("/login");
            return;
        }

        async function loadOrders() {
            try {
                const data = await getOrders();
                setOrders(data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        }

        loadOrders();
    }, [isAuthenticated, router]);

    if (loading) {
        return (
            <main className="min-h-screen bg-gradient-to-br from-black via-slate-950 to-blue-950 p-10">
                <h1 className="text-4xl font-bold text-white">Loading Orders...</h1>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-gradient-to-br from-black via-slate-950 to-blue-950 p-10">

            <h1 className="mb-10 text-4xl font-bold text-white">
                Order History
            </h1>

            {orders.length === 0 ? (
                <div className="glass-card p-10 text-center">
                    <h2 className="text-2xl font-semibold text-white">
                        No Orders Yet
                    </h2>
                    <p className="mt-4 text-gray-400">
                        Your orders will appear here after you place one.
                    </p>
                </div>
            ) : (
                <div className="space-y-6">
                    {orders.map((order) => (
                        <div key={order.id} className="glass-card p-6">
                            <div className="flex items-center justify-between mb-4">
                                <div>
                                    <h2 className="text-xl font-bold text-white">
                                        Order #{order.id}
                                    </h2>
                                    <p className="text-sm text-gray-400">
                                        {new Date(order.createdAt).toLocaleDateString("en-IN", {
                                            year: "numeric",
                                            month: "long",
                                            day: "numeric",
                                            hour: "2-digit",
                                            minute: "2-digit",
                                        })}
                                    </p>
                                </div>
                                <div className="text-right">
                                    <span className="rounded-lg bg-green-500/20 px-3 py-1 text-sm font-semibold text-green-400">
                                        {order.status}
                                    </span>
                                    <p className="mt-2 text-2xl font-bold text-green-400">
                                        ₹ {order.totalPrice}
                                    </p>
                                </div>
                            </div>

                            <div className="border-t border-blue-500/20 pt-4 space-y-3">
                                {order.orderItems.map((item) => (
                                    <div key={item.id} className="flex items-center gap-4">
                                        <img
                                            src={item.product.thumbnail}
                                            alt={item.product.title}
                                            className="h-12 w-12 rounded-lg object-cover"
                                        />
                                        <div className="flex-1">
                                            <p className="text-white font-medium">
                                                {item.product.title}
                                            </p>
                                            <p className="text-sm text-gray-400">
                                                Qty: {item.quantity} × ₹ {item.price}
                                            </p>
                                        </div>
                                        <p className="text-white font-semibold">
                                            ₹ {item.quantity * item.price}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            )}

        </main>
    );
}
