"use client";

import Link from "next/link";
import { useState } from "react";
import Sidebar from "./Sidebar";

export default function Navbar() {
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState("");
    return (
        <>
            <nav className="sticky top-0 z-50 flex items-center justify-between border-b border-blue-500/20 bg-black/70 px-6 py-4 backdrop-blur-xl shadow-2xl shadow-blue-950/30">

                {/* Left Section */}
                <div className="flex items-center gap-4">

                    <button
                        onClick={() => setOpen(true)}
                        className="text-3xl text-white transition hover:text-blue-400"
                    >
                        ☰
                    </button>

                    <Link
                        href="/"
                        className="text-2xl font-bold tracking-wide text-white hover:text-blue-400 transition"
                    >
                        Shopify
                    </Link>

                </div>

                {/* Search Bar */}
                <div className="hidden w-1/3 md:block">

                    <input
                        type="text"
                        placeholder="Search products..."
                        className="w-full rounded-xl border border-blue-500/20 bg-slate-900/70 px-4 py-2 text-white placeholder-gray-400 outline-none backdrop-blur-md transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30"
                    />

                </div>

                {/* Right Section */}
                <div className="flex items-center gap-6 text-white">

                    <Link
                        href="/products"
                        className="transition hover:text-blue-400"
                    >
                        Products
                    </Link>

                    <Link
                        href="/cart"
                        className="transition hover:text-blue-400"
                    >
                        🛒 Cart
                    </Link>

                    <Link
                        href="/orders"
                        className="transition hover:text-blue-400"
                    >
                        Orders
                    </Link>

                    <Link
                        href="/login"
                        className="rounded-xl border border-blue-500/30 bg-blue-700 px-5 py-2 font-semibold text-white transition hover:bg-blue-800 hover:shadow-lg hover:shadow-blue-500/40"
                    >
                        Login
                    </Link>

                </div>

            </nav>

            <Sidebar open={open} setOpen={setOpen} />
        </>
    );
}