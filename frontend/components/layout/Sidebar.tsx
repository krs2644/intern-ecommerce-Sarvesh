"use client";

import Link from "next/link";

type Props = {
    open: boolean;
    setOpen: (value: boolean) => void;
};

export default function Sidebar({
    open,
    setOpen,
}: Props) {
    return (
        <>
            {/* Overlay */}
            {open && (
                <div
                    className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm"
                    onClick={() => setOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`fixed left-0 top-0 z-50 h-screen w-72 border-r border-blue-500/20 bg-black/90 backdrop-blur-2xl shadow-2xl shadow-blue-900/30 transition-transform duration-300 ${
                    open ? "translate-x-0" : "-translate-x-full"
                }`}
            >
                {/* Header */}
                <div className="flex items-center justify-between border-b border-slate-700 p-5">

                    <h2 className="text-2xl font-bold text-white">
                        Shopify
                    </h2>

                    <button
                        onClick={() => setOpen(false)}
                        className="text-2xl text-white transition hover:text-blue-400"
                    >
                        ✕
                    </button>

                </div>

                {/* Navigation */}
                <nav className="flex flex-col gap-2 p-5">

                    <Link
                        href="/"
                        className="rounded-xl p-3 text-white transition duration-300 hover:bg-blue-900/40 hover:text-blue-300"
                    >
                        🏠 Home
                    </Link>

                    <Link
                        href="/products"
                        className="rounded-xl p-3 text-white transition duration-300 hover:bg-blue-900/40 hover:text-blue-300"
                    >
                        🛍 Products
                    </Link>

                    <Link
                        href="/cart"
                        className="rounded-xl p-3 text-white transition duration-300 hover:bg-blue-900/40 hover:text-blue-300"
                    >
                        🛒 Cart
                    </Link>

                    <Link
                        href="/orders"
                        className="rounded-xl p-3 text-white transition duration-300 hover:bg-blue-900/40 hover:text-blue-300"
                    >
                        📦 Orders
                    </Link>

                    <Link
                        href="/login"
                        className="rounded-xl p-3 text-white transition duration-300 hover:bg-blue-900/40 hover:text-blue-300"
                    >
                        🔑 Login
                    </Link>

                    <Link
                        href="/signup"
                        className="rounded-xl p-3 text-white transition duration-300 hover:bg-blue-900/40 hover:text-blue-300"
                    >
                        📝 Signup
                    </Link>

                </nav>

                {/* Footer */}
                <div className="absolute bottom-0 w-full border-t border-slate-700 p-5">

                    <p className="text-center text-sm text-gray-400">
                        Shopify © 2026
                    </p>

                </div>
            </aside>
        </>
    );
}