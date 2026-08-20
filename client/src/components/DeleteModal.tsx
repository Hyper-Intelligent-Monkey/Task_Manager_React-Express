import { Button } from "./Button";

interface DeleteModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

export default function DeleteModal({ isOpen, onClose, onConfirm}: DeleteModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-6">
            {/* Backdrop */}
            <div 
                className="absolute inset-0 bg-dark/20 backdrop-blur-sm animate-fade-in" 
                onClick={onClose}
            />
            
            {/* Modal */}
            <div className="relative bg-white w-full max-w-md p-8 rounded-3xl shadow-2xl animate-scale-in border border-card-border">
                <h2 className="text-2xl font-bold text-dark mb-4">Delete Task?</h2>
                <p className="text-text mb-8 leading-relaxed">
                    Are you sure you want to delete this task? 
                </p>
                
                <div className="flex gap-4">
                    <Button 
                        onClick={onClose}
                        className="flex-1 !bg-gray-100 !text-dark hover:!bg-gray-200"
                    >
                        Cancel
                    </Button>
                    <Button 
                        onClick={onConfirm}
                        className="flex-1 !bg-red-500 !text-white hover:!bg-red-600"
                    >
                        Yes, Delete
                    </Button>
                </div>
            </div>
        </div>
    );
}