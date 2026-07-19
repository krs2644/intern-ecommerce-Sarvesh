export interface Product {
    id: number;
    dummyId: number;
    title: string;
    description: string;
    category: string;
    brand?: string;
    price: number;
    discountPercentage?: number;
    rating?: number;
    stock: number;
    thumbnail: string;
    images: string[];
    createdAt: string;
    updatedAt: string;
}
