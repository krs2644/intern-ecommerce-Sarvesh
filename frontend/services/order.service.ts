import { fetchAPI } from "@/lib/api";
import { Order } from "@/types";

export async function placeOrder(): Promise<Order> {
    return fetchAPI<Order>("/orders/place", {
        method: "POST",
    });
}

export async function getOrders(): Promise<Order[]> {
    return fetchAPI<Order[]>("/orders");
}
