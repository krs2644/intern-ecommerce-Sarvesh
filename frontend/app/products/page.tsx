"use client";

import { useEffect, useState } from "react";
import { useSearch } from "@/context/SearchContext";
import { useProducts } from "@/hooks";
import ProductGrid from "@/components/product/ProductGrid";
import Spinner from "@/components/ui/Spinner";
import ErrorMessage from "@/components/ui/ErrorMessage";

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
            <main className="min-h-screen bg-white p-10">
                <Spinner />
            </main>
        );
    }

    if (error) {
        return (
            <main className="min-h-screen bg-white p-10">
                <ErrorMessage message={error} />
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-white p-10">
            <h1 className="mb-8 text-4xl font-bold text-gray-900">Products</h1>
            <ProductGrid products={filteredProducts} />
        </main>
    );
}
