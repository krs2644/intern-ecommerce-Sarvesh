"use client";

import Link from "next/link";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import Sidebar from "./Sidebar";
import SearchBar from "@/components/ui/SearchBar";

export default function Navbar() {
    const [open, setOpen] = useState(false);
    const { isAuthenticated, logout } = useAuth();

    return (
        <>
            <nav className="sticky top-0 z-50 flex items-center justify-between border-b border-blue-500/20 bg-black/70 px-6 py-4 backdrop-blur-xl shadow-2xl shadow-blue-950/30">

                <div className="flex items-center gap-4">
                    <button
                        onClick={() => setOpen(true)}
                        className="text-3xl text-white hover:text-blue-400"
                    >
                        ☰
                    </button>

                    <Link
                        href="/"
                        className="text-2xl font-bold text-white"
                    >
                        ShopEase
                    </Link>
                </div>

                <div className="hidden w-1/3 md:block">
                    <SearchBar />
                </div>

                <div className="flex items-center gap-6 text-white">
                    <Link href="/products">Products</Link>
                    <Link href="/cart">🛒 Cart</Link>
                    <Link href="/orders">Orders</Link>

                    {isAuthenticated ? (
                        <>
                            <Link href="/profile">Profile</Link>
                            <button
                                onClick={logout}
                                className="rounded-xl bg-red-700 px-5 py-2 font-semibold"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <Link
                            href="/login"
                            className="rounded-xl bg-blue-700 px-5 py-2 font-semibold"
                        >
                            Login
                        </Link>
                    )}
                </div>
            </nav>

            <Sidebar open={open} setOpen={setOpen} />
        </>
    );
}