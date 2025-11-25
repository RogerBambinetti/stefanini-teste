interface SuccessToastProps {
    message: string;
    isVisible: boolean;
}

export function SuccessToast({ message, isVisible }: SuccessToastProps) {
    if (!isVisible) {
        return null;
    }

    return (
        <div className="p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
            {message}
        </div>
    );
}
