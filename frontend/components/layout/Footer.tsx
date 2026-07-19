export default function Footer() {
    return (
        <footer className="border-t border-blue-500/20 bg-black/50 py-8">
            <div className="container mx-auto px-6 text-center text-sm text-gray-400">
                ShopEase &copy; {new Date().getFullYear()}. All rights reserved.
            </div>
        </footer>
    );
}
