import ProductGrid from "@/components/product/ProductGrid";

export default function ProductsPage() {
    return (
        <main className="min-h-screen bg-slate-100">

            <div className="mx-auto max-w-7xl p-10">

                <h1 className="mb-8 text-4xl font-bold">
                    Products
                </h1>

                <ProductGrid />

            </div>

        </main>
    );
}