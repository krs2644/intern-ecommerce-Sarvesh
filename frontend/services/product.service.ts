import { fetchAPI } from "@/lib/api";
import { Product } from "@/types";

export async function getProducts(): Promise<Product[]> {
    const result = await fetchAPI<{ data: Product[] }>("/products");
    return result.data;
}

export async function getProduct(id: number): Promise<Product> {
    return fetchAPI<Product>(`/products/${id}`);
}

export async function searchProducts(query: string): Promise<Product[]> {
    const result = await fetchAPI<{ data: Product[] }>(`/products/search?q=${encodeURIComponent(query)}`);
    return result.data;
}

export async function getCategories(): Promise<string[]> {
    return fetchAPI<string[]>("/products/categories");
}

export async function getProductsByCategory(category: string): Promise<Product[]> {
    const result = await fetchAPI<{ data: Product[] }>(`/products/category/${encodeURIComponent(category)}`);
    return result.data;
}
