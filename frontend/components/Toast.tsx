"use client";

import { useEffect } from "react";

type Props = {
    message: string;
    onClose: () => void;
};

export default function Toast({ message, onClose }: Props) {
    useEffect(() => {
        const timer = setTimeout(onClose, 3000);
        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div className="fixed bottom-6 right-6 z-50 animate-fade-in">
            <div className="flex items-center gap-3 rounded-lg border border-slate-200 bg-white px-4 py-3 shadow-lg">
                <svg className="h-5 w-5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-sm font-medium text-slate-900">{message}</p>
                <button
                    onClick={onClose}
                    className="ml-2 rounded p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
                >
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
        </div>
    );
}
