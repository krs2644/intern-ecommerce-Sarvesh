import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-slate-950 to-blue-950 flex items-center justify-center">

      <div className="glass-card w-full max-w-3xl p-12 text-center">

        <h1 className="mb-6 text-6xl font-extrabold tracking-wide text-white">
          Shopify
        </h1>

        <p className="mb-10 text-xl text-gray-300">
          Discover Electronics, Fashion, Beauty, Furniture and much more —
          all in one place.
        </p>

        <div className="flex justify-center gap-6">

          <Link
            href="/products"
            className="rounded-xl bg-blue-600 px-8 py-4 font-semibold text-white transition duration-300 hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/40"
          >
            Shop Now
          </Link>

          <Link
            href="/login"
            className="rounded-xl border border-blue-500/30 bg-slate-900/40 px-8 py-4 font-semibold text-white backdrop-blur-md transition duration-300 hover:bg-blue-900/40"
          >
            Login
          </Link>

        </div>

      </div>

    </main>
  );
}