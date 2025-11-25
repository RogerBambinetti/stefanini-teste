import { useEffect, useState } from 'react';

interface SuccessToastProps {
    message: string;
    isVisible: boolean;
}

export function SuccessToast({ message, isVisible }: SuccessToastProps) {
    const [show, setShow] = useState(isVisible);

    useEffect(() => {
        setShow(isVisible);
    }, [isVisible]);

    useEffect(() => {
        if (show) {
            const timer = setTimeout(() => {
                setShow(false);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [show]);

    return (
        <div
            className={`fixed top-4 right-4 z-50 transition-all duration-300 ease-in-out ${show ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-96 pointer-events-none'
                }`}
        >
            <div className="p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg shadow-lg">
                {message}
            </div>
        </div>
    );
}
