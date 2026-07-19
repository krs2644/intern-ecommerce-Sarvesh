"use client";

import { useEffect, useState } from "react";
import { getOrders } from "@/services/order.service";
import { Order } from "@/types";

export function useOrders() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function load() {
            try {
                const data = await getOrders();
                setOrders(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : "Failed to fetch orders");
            } finally {
                setLoading(false);
            }
        }
        load();
    }, []);

    return { orders, loading, error };
}
