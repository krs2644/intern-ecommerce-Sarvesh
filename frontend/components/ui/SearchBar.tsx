"use client";

import { useSearch } from "@/context/SearchContext";

export default function SearchBar() {
    const { search, setSearch } = useSearch();

    return (
        <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products..."
            className="w-full rounded-xl border border-blue-500/20 bg-slate-900/70 px-4 py-2 text-white placeholder-gray-400 outline-none"
        />
    );
}
