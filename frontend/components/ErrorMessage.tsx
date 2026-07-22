type Props = {
    message: string;
};

export default function ErrorMessage({ message }: Props) {
    return (
        <div className="flex min-h-[40vh] items-center justify-center">
            <div className="text-center">
                <svg
                    className="mx-auto h-12 w-12 text-red-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
                    />
                </svg>
                <p className="mt-3 text-sm text-slate-600">{message}</p>
            </div>
        </div>
    );
}
