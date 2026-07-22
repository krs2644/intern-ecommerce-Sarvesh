"use client";

import { useEffect, useState } from "react";
import { useSearch } from "@/context/SearchContext";
import { getProducts, searchProducts } from "@/services/product.service";
import { Product } from "@/types";
import ProductGrid from "@/components/ProductGrid";
import Spinner from "@/components/Spinner";
import ErrorMessage from "@/components/ErrorMessage";

const LIMIT = 10;

export default function ProductsPage() {
    const { search } = useSearch();
    const [debouncedSearch, setDebouncedSearch] = useState(search);
    const [page, setPage] = useState(1);
    const [products, setProducts] = useState<Product[]>([]);
    const [totalPages, setTotalPages] = useState(0);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(search);
            setPage(1);
        }, 500);
        return () => clearTimeout(timer);
    }, [search]);

    useEffect(() => {
        let cancelled = false;
        async function load() {
            setLoading(true);
            setError(null);
            try {
                const result = debouncedSearch
                    ? await searchProducts(debouncedSearch, page, LIMIT)
                    : await getProducts(page, LIMIT);
                if (!cancelled) {
                    setProducts(result.data);
                    setTotalPages(result.meta.totalPages);
                    setTotal(result.meta.total);
                }
            } catch (err) {
                if (!cancelled) {
                    setError(err instanceof Error ? err.message : "Failed to fetch products");
                }
            } finally {
                if (!cancelled) {
                    setLoading(false);
                }
            }
        }
        load();
        return () => { cancelled = true; };
    }, [debouncedSearch, page]);

    if (loading) {
        return (
            <main className="min-h-screen bg-slate-50 py-12">
                <Spinner />
            </main>
        );
    }

    if (error) {
        return (
            <main className="min-h-screen bg-slate-50 py-12">
                <div className="container">
                    <ErrorMessage message={error} />
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-slate-50 py-8">
            <div className="container">
                <div className="mb-8">
                    <h1 className="section-title">All Products</h1>
                    <p className="mt-2 text-sm text-slate-500">
                        {total} product{total !== 1 ? "s" : ""} found
                    </p>
                </div>
                <ProductGrid products={products} />

                {totalPages > 1 && (
                    <div className="mt-8 flex items-center justify-center gap-2">
                        <button
                            onClick={() => setPage((p) => Math.max(1, p - 1))}
                            disabled={page === 1}
                            className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed"
                        >
                            Previous
                        </button>
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                            <button
                                key={p}
                                onClick={() => setPage(p)}
                                className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                                    p === page
                                        ? "bg-blue-600 text-white"
                                        : "border border-slate-300 bg-white text-slate-700 hover:bg-slate-50"
                                }`}
                            >
                                {p}
                            </button>
                        ))}
                        <button
                            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                            disabled={page === totalPages}
                            className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed"
                        >
                            Next
                        </button>
                    </div>
                )}
            </div>
        </main>
    );
}
