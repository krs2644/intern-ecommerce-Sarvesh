import { fetchAPI } from "@/services/api";
import { Cart } from "@/types";

export async function getCart(): Promise<Cart> {
    return fetchAPI<Cart>("/carts");
}

export async function getCartTotal(): Promise<number> {
    return fetchAPI<number>("/carts/total");
}

export async function addToCart(productId: number, quantity = 1): Promise<Cart> {
    return fetchAPI<Cart>("/carts/add", {
        method: "POST",
        body: JSON.stringify({ productId, quantity }),
    });
}

export async function increaseQuantity(cartItemId: number): Promise<Cart> {
    return fetchAPI<Cart>(`/carts/increase/${cartItemId}`, {
        method: "PATCH",
    });
}

export async function decreaseQuantity(cartItemId: number): Promise<Cart> {
    return fetchAPI<Cart>(`/carts/decrease/${cartItemId}`, {
        method: "PATCH",
    });
}

export async function removeItem(cartItemId: number): Promise<Cart> {
    return fetchAPI<Cart>(`/carts/${cartItemId}`, {
        method: "DELETE",
    });
}

export async function clearCart(): Promise<Cart> {
    return fetchAPI<Cart>("/carts", {
        method: "DELETE",
    });
}
