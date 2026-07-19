import { Order } from "@/types";

type Props = {
    order: Order;
};

export default function OrderCard({ order }: Props) {
    const statusStyles: Record<string, string> = {
        pending: "badge-warning",
        completed: "badge-success",
        cancelled: "badge-danger",
        processing: "badge-info",
    };

    const statusClass = statusStyles[order.status.toLowerCase()] || "badge-info";

    return (
        <div className="card p-6">
            <div className="flex items-start justify-between">
                <div>
                    <h3 className="text-base font-semibold text-slate-900">
                        Order #{order.id}
                    </h3>
                    <p className="mt-0.5 text-xs text-slate-500">
                        {new Date(order.createdAt).toLocaleDateString("en-IN", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                        })}
                    </p>
                </div>
                <div className="text-right">
                    <span className={statusClass}>{order.status}</span>
                    <p className="mt-2 text-lg font-bold text-slate-900">
                        ₹{order.totalPrice}
                    </p>
                </div>
            </div>

            <div className="mt-4 border-t border-slate-100 pt-4">
                <div className="space-y-3">
                    {order.orderItems.map((item) => (
                        <div key={item.id} className="flex items-center gap-3">
                            <img
                                src={item.product.thumbnail}
                                alt={item.product.title}
                                className="h-10 w-10 rounded-lg object-cover"
                            />
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-slate-900 truncate">
                                    {item.product.title}
                                </p>
                                <p className="text-xs text-slate-500">
                                    {item.quantity} × ₹{item.price}
                                </p>
                            </div>
                            <p className="text-sm font-medium text-slate-900">
                                ₹{item.quantity * item.price}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
