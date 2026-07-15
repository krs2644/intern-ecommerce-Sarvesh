import { Product } from "@/types/product";

interface Props {
    product: Product;
}

export default function ProductCard({ product }: Props) {
    return (
        <div className="rounded-xl border border-gray-200 bg-white shadow-md transition hover:shadow-xl">

            <img
                src={product.thumbnail}
                alt={product.title}
                className="h-52 w-full rounded-t-xl object-cover"
            />

            <div className="p-4">

                <h2 className="line-clamp-1 text-lg font-bold">
                    {product.title}
                </h2>

                <p className="mt-2 line-clamp-2 text-sm text-gray-600">
                    {product.description}
                </p>

                <p className="mt-2 text-xs uppercase text-gray-500">
                    {product.category}
                </p>

                <div className="mt-4 flex items-center justify-between">

                    <span className="text-2xl font-bold text-green-600">
                        ₹ {product.price}
                    </span>

                    <span className="rounded bg-yellow-400 px-2 py-1 text-sm">
                        ⭐ {product.rating}
                    </span>

                </div>

                <button
                    className="mt-5 w-full rounded-lg bg-blue-600 py-2 font-semibold text-white hover:bg-blue-700"
                >
                    Add to Cart
                </button>

            </div>
        </div>
    );
}