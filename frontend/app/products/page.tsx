"use client";

import { useEffect, useState } from "react";
import { useSearch } from "@/context/SearchContext";
import { useProducts } from "@/hooks";
import ProductGrid from "@/components/ProductGrid";
import Spinner from "@/components/Spinner";
import ErrorMessage from "@/components/ErrorMessage";

export default function ProductsPage() {
    const { products, loading, error } = useProducts();
    const { search } = useSearch();
    const [debouncedSearch, setDebouncedSearch] = useState(search);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(search);
        }, 500);
        return () => clearTimeout(timer);
    }, [search]);

    const filteredProducts = products.filter((product) =>
        product.title.toLowerCase().includes(debouncedSearch.toLowerCase())
    );

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
                        {filteredProducts.length} product{filteredProducts.length !== 1 ? "s" : ""} found
                    </p>
                </div>
                <ProductGrid products={filteredProducts} />
            </div>
        </main>
    );
}
