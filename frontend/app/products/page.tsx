"use client";

import { useEffect, useState } from "react";
import { getProducts } from "@/services/product.service";
import { useSearch } from "@/context/SearchContext";
import ProductGrid from "@/components/product/ProductGrid";

type Product = {
    id: number;
    title: string;
    description: string;
    category: string;
    brand?: string;
    price: number;
    discountPercentage?: number;
    rating?: number;
    stock: number;
    thumbnail: string;
};

export default function ProductsPage() {

    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    const { search } = useSearch();

    const [debouncedSearch, setDebouncedSearch] = useState(search);

    // Debounce search
    useEffect(() => {

        const timer = setTimeout(() => {

            setDebouncedSearch(search);

        }, 500);

        return () => clearTimeout(timer);

    }, [search]);

    // Load products
    useEffect(() => {

        async function loadProducts() {

            try {

                const data = await getProducts();

                setProducts(data);

            } catch (error) {

                console.error(error);

            } finally {

                setLoading(false);

            }

        }

        loadProducts();

    }, []);

    // Filter products
    const filteredProducts = products.filter((product) =>
        product.title
            .toLowerCase()
            .includes(debouncedSearch.toLowerCase())
    );

    if (loading) {

        return (

            <main className="flex min-h-screen items-center justify-center bg-white">

                <h1 className="text-3xl font-bold text-gray-900">

                    Loading Products...

                </h1>

            </main>

        );

    }

    return (

        <main className="min-h-screen bg-white p-10">

            <h1 className="mb-8 text-4xl font-bold text-gray-900">

                Products

            </h1>

            <ProductGrid products={filteredProducts} />

        </main>

    );

}