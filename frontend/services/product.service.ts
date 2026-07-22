import { fetchAPI } from "@/services/api";
import { Product } from "@/types";

export interface PaginatedResponse<T> {
    data: T[];
    meta: {
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    };
}

export async function getProducts(page = 1, limit = 10): Promise<PaginatedResponse<Product>> {
    return fetchAPI<PaginatedResponse<Product>>(`/products?page=${page}&limit=${limit}`);
}

export async function getProduct(id: number): Promise<Product> {
    return fetchAPI<Product>(`/products/${id}`);
}

export async function searchProducts(query: string, page = 1, limit = 10): Promise<PaginatedResponse<Product>> {
    return fetchAPI<PaginatedResponse<Product>>(`/products/search?q=${encodeURIComponent(query)}&page=${page}&limit=${limit}`);
}

export async function getCategories(): Promise<string[]> {
    return fetchAPI<string[]>("/products/categories");
}

export async function getProductsByCategory(category: string, page = 1, limit = 10): Promise<PaginatedResponse<Product>> {
    return fetchAPI<PaginatedResponse<Product>>(`/products/category/${encodeURIComponent(category)}?page=${page}&limit=${limit}`);
}
