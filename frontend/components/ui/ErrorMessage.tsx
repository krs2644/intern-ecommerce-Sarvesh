type Props = {
    message: string;
};

export default function ErrorMessage({ message }: Props) {
    return (
        <div className="flex min-h-[40vh] items-center justify-center">
            <p className="text-lg text-red-400">{message}</p>
        </div>
    );
}
