export default function CartPage() {
    return (
        <main className="min-h-screen bg-slate-100 p-10">

            <h1 className="text-4xl font-bold">
                Shopping Cart
            </h1>

            <div className="mt-10 rounded-lg bg-white p-10 shadow">

                <h2 className="text-2xl font-semibold">
                    Your cart is empty
                </h2>

                <p className="mt-4 text-gray-500">
                    Add products to start shopping.
                </p>

            </div>

        </main>
    );
}