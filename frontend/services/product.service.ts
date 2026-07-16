const API_URL = "http://localhost:3001/products";

/**
 * Fetch all products
 */
export async function getProducts() {
    const response = await fetch(API_URL);

    if (!response.ok) {
        throw new Error("Failed to fetch products");
    }

    return response.json();
}

/**
 * Fetch one product
 */
export async function getProduct(id: number) {
    const response = await fetch(`${API_URL}/${id}`);

    if (!response.ok) {
        throw new Error("Product not found");
    }

    return response.json();
}

/**
 * Search products
 */
export async function searchProducts(query: string) {
    const response = await fetch(
        `${API_URL}/search?q=${encodeURIComponent(query)}`
    );

    if (!response.ok) {
        throw new Error("Search failed");
    }

    return response.json();
}

/**
 * Fetch all categories
 */
export async function getCategories() {
    const response = await fetch(`${API_URL}/categories`);

    if (!response.ok) {
        throw new Error("Failed to fetch categories");
    }

    return response.json();
}

/**
 * Fetch products of one category
 */
export async function getProductsByCategory(category: string) {
    const response = await fetch(
        `${API_URL}/category/${encodeURIComponent(category)}`
    );

    if (!response.ok) {
        throw new Error("Failed to fetch category");
    }

    return response.json();
}