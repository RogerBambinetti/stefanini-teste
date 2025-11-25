'use client';

import { ReactNode } from 'react';

interface CartModalProps {
    children: ReactNode;
}

export function CartModal({ children }: CartModalProps) {
    return (
        <div className="fixed bottom-4 right-4 w-96 bg-white rounded-lg shadow-2xl z-50 flex flex-col max-h-96">
            {children}
        </div>
    );
}
