export default function Spinner() {
    return (
        <div className="flex min-h-[40vh] items-center justify-center">
            <div className="flex flex-col items-center gap-3">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
                <p className="text-sm text-slate-500">Loading...</p>
            </div>
        </div>
    );
}
