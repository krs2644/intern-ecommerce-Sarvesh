import { Product } from "./product";

export interface OrderItem {
    id: number;
    orderId: number;
    productId: number;
    quantity: number;
    price: number;
    product: Product;
}

export interface Order {
    id: number;
    userId: number;
    totalPrice: number;
    status: string;
    createdAt: string;
    updatedAt: string;
    orderItems: OrderItem[];
}
