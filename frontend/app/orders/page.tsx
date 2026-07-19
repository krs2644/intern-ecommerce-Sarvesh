"use client";

import { useOrders } from "@/hooks";
import AuthGuard from "@/components/auth/AuthGuard";
import OrderCard from "@/components/order/OrderCard";
import Spinner from "@/components/ui/Spinner";
import ErrorMessage from "@/components/ui/ErrorMessage";

export default function OrdersPage() {
    const { orders, loading, error } = useOrders();

    return (
        <AuthGuard>
            <main className="min-h-screen bg-gradient-to-br from-black via-slate-950 to-blue-950 p-10">
                <h1 className="mb-10 text-4xl font-bold text-white">Order History</h1>

                {loading ? (
                    <Spinner />
                ) : error ? (
                    <ErrorMessage message={error} />
                ) : orders.length === 0 ? (
                    <div className="glass-card p-10 text-center">
                        <h2 className="text-2xl font-semibold text-white">No Orders Yet</h2>
                        <p className="mt-4 text-gray-400">
                            Your orders will appear here after you place one.
                        </p>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {orders.map((order) => (
                            <OrderCard key={order.id} order={order} />
                        ))}
                    </div>
                )}
            </main>
        </AuthGuard>
    );
}
