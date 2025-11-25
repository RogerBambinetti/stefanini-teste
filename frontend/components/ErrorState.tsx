interface ErrorStateProps {
    error: string;
}

export function ErrorState({ error }: ErrorStateProps) {
    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="text-sm text-red-600">Erro: {error}</div>
        </div>
    );
}
