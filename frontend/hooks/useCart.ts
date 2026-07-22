"use client";

import { useEffect, useState, useCallback } from "react";
import { getCart, getCartTotal } from "@/services/cart.service";
import { Cart } from "@/types";

export function useCart() {
    const [cart, setCart] = useState<Cart | null>(null);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const refresh = useCallback(async () => {
        try {
            const [cartData, totalData] = await Promise.all([
                getCart(),
                getCartTotal(),
            ]);
            setCart(cartData);
            setTotal(totalData);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to fetch cart");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        refresh();
    }, [refresh]);

    return { cart, setCart, total, loading, error, refresh };
}
