import { Order } from "@/types";

type Props = {
    order: Order;
};

export default function OrderCard({ order }: Props) {
    return (
        <div className="glass-card p-6">
            <div className="mb-4 flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-bold text-white">
                        Order #{order.id}
                    </h2>
                    <p className="text-sm text-gray-400">
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
                    <span className="rounded-lg bg-green-500/20 px-3 py-1 text-sm font-semibold text-green-400">
                        {order.status}
                    </span>
                    <p className="mt-2 text-2xl font-bold text-green-400">
                        ₹ {order.totalPrice}
                    </p>
                </div>
            </div>

            <div className="space-y-3 border-t border-blue-500/20 pt-4">
                {order.orderItems.map((item) => (
                    <div key={item.id} className="flex items-center gap-4">
                        <img
                            src={item.product.thumbnail}
                            alt={item.product.title}
                            className="h-12 w-12 rounded-lg object-cover"
                        />
                        <div className="flex-1">
                            <p className="font-medium text-white">
                                {item.product.title}
                            </p>
                            <p className="text-sm text-gray-400">
                                Qty: {item.quantity} × ₹ {item.price}
                            </p>
                        </div>
                        <p className="font-semibold text-white">
                            ₹ {item.quantity * item.price}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}
