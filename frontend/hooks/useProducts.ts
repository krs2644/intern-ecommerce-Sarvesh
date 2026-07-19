"use client";

import { useEffect, useState } from "react";
import { getProducts } from "@/services/product.service";
import { Product } from "@/types";

export function useProducts() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function load() {
            try {
                const data = await getProducts();
                setProducts(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : "Failed to fetch products");
            } finally {
                setLoading(false);
            }
        }
        load();
    }, []);

    return { products, loading, error };
}
