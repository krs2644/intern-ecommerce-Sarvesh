import { fetchAPI } from "@/lib/api";

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

export async function getOrders() {
    return fetchAPI("/orders");
}
