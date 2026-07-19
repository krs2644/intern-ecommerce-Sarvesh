"use client";

import { useEffect, useState } from "react";

type Props = {
    message: string;
    onClose: () => void;
    duration?: number;
};

export default function Toast({ message, onClose, duration = 3000 }: Props) {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setVisible(false);
            onClose();
        }, duration);

        return () => clearTimeout(timer);
    }, [duration, onClose]);

    if (!visible) return null;

    return (
        <div className="fixed bottom-6 right-6 z-50 rounded-xl bg-green-600 px-6 py-3 text-white shadow-lg">
            {message}
        </div>
    );
}
