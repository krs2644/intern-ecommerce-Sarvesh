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
            <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur-lg">
                <div className="container flex h-16 items-center justify-between gap-4">

                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setOpen(true)}
                            className="rounded-lg p-2 text-slate-600 hover:bg-slate-100"
                        >
                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>

                        <Link href="/" className="flex items-center gap-2">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-sm font-bold text-white">
                                S
                            </div>
                            <span className="text-lg font-bold tracking-tight text-slate-900">
                                ShopEase
                            </span>
                        </Link>
                    </div>

                    <div className="hidden w-96 md:block">
                        <SearchBar />
                    </div>

                    <div className="hidden items-center gap-2 lg:flex">
                        {isAuthenticated ? (
                            <>
                                <Link
                                    href="/profile"
                                    className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition-all duration-200 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700 hover:shadow-md"
                                >
                                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                    Profile
                                </Link>
                                <div className="mx-1 h-5 w-px bg-slate-200" />
                                <button
                                    onClick={logout}
                                    className="inline-flex items-center gap-2 rounded-lg bg-red-50 px-4 py-2 text-sm font-medium text-red-600 transition-all duration-200 hover:bg-red-100 hover:shadow-md"
                                >
                                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
                                    </svg>
                                    Logout
                                </button>
                            </>
                        ) : (
                            <Link
                                href="/login"
                                className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-blue-700 hover:shadow-md"
                            >
                                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
                                </svg>
                                Login
                            </Link>
                        )}
                    </div>

                    <div className="flex items-center gap-2 lg:hidden">
                        {isAuthenticated ? (
                            <Link href="/profile" className="rounded-lg p-2 text-slate-600 hover:bg-slate-100">
                                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                            </Link>
                        ) : (
                            <Link href="/login" className="btn-primary text-xs">
                                Login
                            </Link>
                        )}
                    </div>
                </div>
            </nav>

            <Sidebar open={open} setOpen={setOpen} />
        </>
    );
}
