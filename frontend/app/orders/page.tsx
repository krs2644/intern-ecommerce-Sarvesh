"use client";

import { useOrders } from "@/hooks";
import AuthGuard from "@/components/auth/AuthGuard";
import OrderCard from "@/components/order/OrderCard";
import Spinner from "@/components/ui/Spinner";
import ErrorMessage from "@/components/ui/ErrorMessage";
import Link from "next/link";

export default function OrdersPage() {
    const { orders, loading, error } = useOrders();

    return (
        <AuthGuard>
            <main className="min-h-screen bg-slate-50 py-8">
                <div className="container">
                    <h1 className="mb-8 section-title">Order History</h1>

                    {loading ? (
                        <Spinner />
                    ) : error ? (
                        <ErrorMessage message={error} />
                    ) : orders.length === 0 ? (
                        <div className="card p-12 text-center">
                            <svg
                                className="mx-auto h-16 w-16 text-slate-300"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={1}
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15a2.25 2.25 0 012.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25z" />
                            </svg>
                            <h2 className="mt-4 text-lg font-semibold text-slate-900">No orders yet</h2>
                            <p className="mt-2 text-sm text-slate-500">
                                Your orders will appear here after you place one.
                            </p>
                            <Link
                                href="/products"
                                className="btn-primary mt-6 inline-flex"
                            >
                                Start Shopping
                            </Link>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {orders.map((order) => (
                                <OrderCard key={order.id} order={order} />
                            ))}
                        </div>
                    )}
                </div>
            </main>
        </AuthGuard>
    );
}
