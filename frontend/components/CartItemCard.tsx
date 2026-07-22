"use client";

import { useState } from "react";
import { increaseQuantity, decreaseQuantity, removeItem } from "@/services/cart.service";
import { CartItem } from "@/types";

type Props = {
    item: CartItem;
    onRemove: (id: number) => void;
    onQuantityChange: (id: number, newQuantity: number) => void;
};

export default function CartItemCard({ item, onRemove, onQuantityChange }: Props) {
    const [qty, setQty] = useState(item.quantity);

    async function handleIncrease() {
        const newQty = qty + 1;
        setQty(newQty);
        onQuantityChange(item.id, newQty);
        try {
            await increaseQuantity(item.id);
        } catch {
            setQty(qty);
            onQuantityChange(item.id, qty);
        }
    }

    async function handleDecrease() {
        if (qty <= 1) return;
        const newQty = qty - 1;
        setQty(newQty);
        onQuantityChange(item.id, newQty);
        try {
            await decreaseQuantity(item.id);
        } catch {
            setQty(qty);
            onQuantityChange(item.id, qty);
        }
    }

    async function handleRemove() {
        onRemove(item.id);
        try {
            await removeItem(item.id);
        } catch {
            // parent already removed, worst case it reappears on refresh
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
                        disabled={qty <= 1}
                        className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-300 text-slate-600 transition-colors hover:bg-slate-50 disabled:opacity-40"
                    >
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15" />
                        </svg>
                    </button>
                    <span className="w-8 text-center text-sm font-medium text-slate-900">
                        {qty}
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
                        ₹{(item.product.price * qty).toFixed(2)}
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
