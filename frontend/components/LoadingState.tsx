interface LoadingStateProps {
    message?: string;
}

export function LoadingState({ message = 'Carregando produtos...' }: LoadingStateProps) {
    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="text-sm text-gray-600">{message}</div>
        </div>
    );
}
