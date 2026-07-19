"use client";

import { increaseQuantity, decreaseQuantity, removeItem } from "@/services/cart.service";
import { CartItem } from "@/types";

type Props = {
    item: CartItem;
    onRefresh: () => void;
};

export default function CartItemCard({ item, onRefresh }: Props) {
    async function handleIncrease() {
        await increaseQuantity(item.id);
        onRefresh();
    }

    async function handleDecrease() {
        await decreaseQuantity(item.id);
        onRefresh();
    }

    async function handleRemove() {
        await removeItem(item.id);
        onRefresh();
    }

    return (
        <div className="glass-card flex items-center justify-between p-6">
            <div className="flex items-center gap-5">
                <img
                    src={item.product.thumbnail}
                    alt={item.product.title}
                    className="h-24 w-24 rounded-lg"
                />
                <div>
                    <h2 className="text-xl font-bold text-white">
                        {item.product.title}
                    </h2>
                    <p className="text-gray-400">₹ {item.product.price}</p>
                    <p className="text-white">Qty : {item.quantity}</p>
                </div>
            </div>

            <div className="flex gap-3">
                <button
                    onClick={handleDecrease}
                    className="rounded bg-red-600 px-4 py-2 text-white"
                >
                    -
                </button>
                <button
                    onClick={handleIncrease}
                    className="rounded bg-green-600 px-4 py-2 text-white"
                >
                    +
                </button>
                <button
                    onClick={handleRemove}
                    className="rounded bg-gray-700 px-4 py-2 text-white"
                >
                    Remove
                </button>
            </div>
        </div>
    );
}
