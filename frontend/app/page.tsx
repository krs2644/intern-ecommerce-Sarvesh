import Link from "next/link";

export default function HomePage() {
    return (
        <main className="min-h-screen bg-slate-50">

            <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute -left-40 -top-40 h-80 w-80 rounded-full bg-white" />
                    <div className="absolute -bottom-40 -right-40 h-80 w-80 rounded-full bg-white" />
                </div>

                <div className="container relative py-24 text-center lg:py-32">
                    <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
                        Discover Your
                        <br />
                        <span className="text-amber-300">Perfect Product</span>
                    </h1>
                    <p className="mx-auto mt-6 max-w-2xl text-lg text-blue-100">
                        Shop electronics, fashion, beauty, and furniture — all in one place. Quality products at unbeatable prices.
                    </p>

                    <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                        <Link
                            href="/products"
                            className="rounded-xl bg-white px-8 py-4 text-sm font-semibold text-blue-700 shadow-lg transition-all duration-200 hover:bg-blue-50 hover:shadow-xl"
                        >
                            Browse Products
                        </Link>
                        <Link
                            href="/signup"
                            className="rounded-xl border-2 border-white/30 px-8 py-4 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-200 hover:border-white/50 hover:bg-white/10"
                        >
                            Create Account
                        </Link>
                    </div>
                </div>
            </section>

            <section className="container py-16">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                    {[
                        {
                            icon: (
                                <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                                </svg>
                            ),
                            title: "Free Shipping",
                            desc: "On orders over ₹500",
                        },
                        {
                            icon: (
                                <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                                </svg>
                            ),
                            title: "Secure Payment",
                            desc: "100% secure checkout",
                        },
                        {
                            icon: (
                                <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182" />
                                </svg>
                            ),
                            title: "Easy Returns",
                            desc: "30-day return policy",
                        },
                    ].map((item) => (
                        <div key={item.title} className="card p-6 text-center">
                            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                                {item.icon}
                            </div>
                            <h3 className="mt-4 text-sm font-semibold text-slate-900">{item.title}</h3>
                            <p className="mt-1 text-sm text-slate-500">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section className="bg-white py-16">
                <div className="container text-center">
                    <h2 className="section-title">Ready to Start Shopping?</h2>
                    <p className="mx-auto mt-4 max-w-lg text-slate-500">
                        Browse our wide collection of products and find exactly what you need.
                    </p>
                    <Link
                        href="/products"
                        className="btn-primary mt-8 inline-flex rounded-xl px-8 py-3 text-sm"
                    >
                        Explore Collection
                    </Link>
                </div>
            </section>
        </main>
    );
}
