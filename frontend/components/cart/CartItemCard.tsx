"use client";

import { increaseQuantity, decreaseQuantity, removeItem } from "@/services/cart.service";
import { CartItem } from "@/types";

type Props = {
    item: CartItem;
    onRefresh: () => void;
};

export default function CartItemCard({ item, onRefresh }: Props) {
    async function handleIncrease() {
        try {
            await increaseQuantity(item.id);
            onRefresh();
        } catch (err) {
            alert(err instanceof Error ? err.message : "Failed to increase quantity");
        }
    }

    async function handleDecrease() {
        try {
            await decreaseQuantity(item.id);
            onRefresh();
        } catch (err) {
            alert(err instanceof Error ? err.message : "Failed to decrease quantity");
        }
    }

    async function handleRemove() {
        try {
            await removeItem(item.id);
            onRefresh();
        } catch (err) {
            alert(err instanceof Error ? err.message : "Failed to remove item");
        }
    }

    return (
        <div className="card p-4">
            <div className="flex items-center gap-4">
                <img
                    src={item.product.thumbnail}
                    alt={item.product.title}
                    className="h-24 w-24 flex-shrink-0 rounded-lg object-cover"
                />

                <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold text-slate-900 truncate">
                        {item.product.title}
                    </h3>
                    <p className="mt-0.5 text-xs text-slate-500">
                        {item.product.category}
                    </p>
                    <p className="mt-1 text-sm font-medium text-slate-900">
                        ₹{item.product.price}
                    </p>
                </div>

                <div className="flex items-center gap-2">
                    <button
                        onClick={handleDecrease}
                        className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-300 text-slate-600 transition-colors hover:bg-slate-50"
                    >
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15" />
                        </svg>
                    </button>
                    <span className="w-8 text-center text-sm font-medium text-slate-900">
                        {item.quantity}
                    </span>
                    <button
                        onClick={handleIncrease}
                        className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-300 text-slate-600 transition-colors hover:bg-slate-50"
                    >
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                    </button>
                </div>

                <div className="text-right">
                    <p className="text-sm font-semibold text-slate-900">
                        ₹{item.product.price * item.quantity}
                    </p>
                    <button
                        onClick={handleRemove}
                        className="mt-1 text-xs font-medium text-red-600 hover:text-red-700"
                    >
                        Remove
                    </button>
                </div>
            </div>
        </div>
    );
}
