"use client";

import { useEffect, useState } from "react";
import { getProduct } from "@/services/product.service";
import { Product } from "@/types";

export function useProduct(id: number) {
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function load() {
            try {
                const data = await getProduct(id);
                setProduct(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : "Product not found");
            } finally {
                setLoading(false);
            }
        }
        load();
    }, [id]);

    return { product, loading, error };
}
