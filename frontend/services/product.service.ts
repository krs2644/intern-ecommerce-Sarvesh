import { Product } from "@/types/product";

const API_URL = "http://localhost:3001/products";

export async function getProducts(): Promise<Product[]> {
    const response = await fetch(API_URL);

    if (!response.ok) {
        throw new Error("Unable to fetch products");
    }

    return response.json();
}