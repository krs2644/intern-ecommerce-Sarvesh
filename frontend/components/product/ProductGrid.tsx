"use client";

import { Product } from "@/types";
import ProductCard from "./ProductCard";

type Props = {
    products: Product[];
};

export default function ProductGrid({ products }: Props) {

    if (products.length === 0) {
        return (
            <div className="flex h-60 items-center justify-center">
                <p className="text-xl text-gray-500">
                    No products found.
                </p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

            {products.map((product) => (
                <ProductCard
                    key={product.id}
                    product={product}
                />
            ))}

        </div>
    );
}