import { useState, useEffect, createContext, useContext, useCallback, type ReactNode } from "react";

type ToastType = "success" | "error";

interface ToastContextType {
    showToast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
    const [toast, setToast] = useState<{ message: string; type: ToastType } | null>(null);
    const [isExiting, setIsExiting] = useState(false);

    const showToast = useCallback((message: string, type: ToastType = "success") => {
        setToast(prev => {
            if (prev?.message === message) return prev;
            return { message, type };
        });
        setIsExiting(false);
    }, []);

    useEffect(() => {
        if (toast) {
            const exitTimer = setTimeout(() => {
                setIsExiting(true);
            }, 2700);

            const removeTimer = setTimeout(() => {
                setToast(null);
                setIsExiting(false);
            }, 3000);

            return () => {
                clearTimeout(exitTimer);
                clearTimeout(removeTimer);
            };
        }
    }, [toast]);

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            {toast && (
                <div className={`fixed bottom-10 right-10 z-[999] ${isExiting ? 'animate-slide-out' : 'animate-slide-in'}`}>
                    <div className={`px-6 py-3 rounded-lg shadow-xl text-white font-medium ${
                        toast.type === 'error' ? 'bg-red-500' : 'bg-green-500'
                    }`}>
                        {toast.message}
                    </div>
                </div>
            )}
        </ToastContext.Provider>
    );
}

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) return { showToast: () => {console.error("Use useToast inside ToastProvider")} };
    return context;
};