import Link from "next/link";

export default function Footer() {
    return (
        <footer className="border-t border-slate-200 bg-white">
            <div className="container py-12">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
                    <div className="md:col-span-2">
                        <div className="flex items-center gap-2">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-sm font-bold text-white">
                                S
                            </div>
                            <span className="text-lg font-bold tracking-tight text-slate-900">
                                ShopEase
                            </span>
                        </div>
                        <p className="mt-3 max-w-sm text-sm text-slate-500">
                            Your one-stop destination for electronics, fashion, beauty, and furniture. Shop with confidence.
                        </p>
                    </div>

                    <div>
                        <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-900">
                            Quick Links
                        </h4>
                        <ul className="mt-4 space-y-2">
                            <li>
                                <Link href="/products" className="text-sm text-slate-500 hover:text-blue-600">
                                    Products
                                </Link>
                            </li>
                            <li>
                                <Link href="/cart" className="text-sm text-slate-500 hover:text-blue-600">
                                    Cart
                                </Link>
                            </li>
                            <li>
                                <Link href="/orders" className="text-sm text-slate-500 hover:text-blue-600">
                                    Orders
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-900">
                            Account
                        </h4>
                        <ul className="mt-4 space-y-2">
                            <li>
                                <Link href="/profile" className="text-sm text-slate-500 hover:text-blue-600">
                                    Profile
                                </Link>
                            </li>
                            <li>
                                <Link href="/login" className="text-sm text-slate-500 hover:text-blue-600">
                                    Login
                                </Link>
                            </li>
                            <li>
                                <Link href="/signup" className="text-sm text-slate-500 hover:text-blue-600">
                                    Sign Up
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="mt-10 border-t border-slate-200 pt-6">
                    <p className="text-center text-xs text-slate-400">
                        © {new Date().getFullYear()} ShopEase. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
