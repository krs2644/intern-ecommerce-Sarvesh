import { fetchAPI } from "@/services/api";
import { Order } from "@/types";

export interface PlaceOrderResponse {
    message: string;
    order: {
        id: number;
        userId: number;
        totalPrice: number;
        status: string;
        createdAt: string;
        updatedAt: string;
    };
}

export async function placeOrder(): Promise<PlaceOrderResponse> {
    return fetchAPI<PlaceOrderResponse>("/orders/place", {
        method: "POST",
    });
}

export async function getOrders(): Promise<Order[]> {
    return fetchAPI<Order[]>("/orders");
}
