import { fetchAPI } from "@/lib/api";
import { Product } from "@/types";

export async function getProducts(): Promise<Product[]> {
    return fetchAPI<Product[]>("/products");
}

export async function getProduct(id: number): Promise<Product> {
    return fetchAPI<Product>(`/products/${id}`);
}

export async function searchProducts(query: string): Promise<Product[]> {
    return fetchAPI<Product[]>(`/products/search?q=${encodeURIComponent(query)}`);
}

export async function getCategories(): Promise<string[]> {
    return fetchAPI<string[]>("/products/categories");
}

export async function getProductsByCategory(category: string): Promise<Product[]> {
    return fetchAPI<Product[]>(`/products/category/${encodeURIComponent(category)}`);
}
