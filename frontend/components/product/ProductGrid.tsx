"use client";

import { useEffect, useState } from "react";
import { getProducts } from "@/services/product.service";
import ProductCard from "./ProductCard";
import { Product } from "@/types/product";

export default function ProductGrid() {

    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

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

    if (loading) {
        return (
            <div className="text-center text-xl">
                Loading products...
            </div>
        );
    }

    return (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

            {products.map((product) => (
                <ProductCard
                    key={product.id}
                    product={product}
                />
            ))}

        </div>
    );
}