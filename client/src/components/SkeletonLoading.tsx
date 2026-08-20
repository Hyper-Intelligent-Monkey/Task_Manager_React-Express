import { Button } from "./Button";
import { useNavigate, useParams } from "react-router-dom";
interface SkeletonProps {
    className?: string;
}

export function Skeleton({ className = "" }: SkeletonProps) {
    return (
        <div className={`bg-gray-200 animate-pulse rounded-md ${className}`} />
    );
}

export function TaskCardSkeleton({ index = 0 }: { index?: number }) {
    return (
        <div 
            className="h-[220px] lg:h-[232px] rounded-xl bg-card-bg border border-card-border p-6 flex flex-col animate-slide-up"
            style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'both' }}
        >
            <Skeleton className="w-20 h-5 rounded-full mb-3" />
            <Skeleton className="w-full h-7 mb-2" />
            <Skeleton className="w-3/4 h-7 mb-4" />
            <div className="space-y-2">
                <Skeleton className="w-full h-4" />
                <Skeleton className="w-full h-4" />
                <Skeleton className="w-5/6 h-4" />
            </div>
        </div>
    );
}

export function TaskDetailsSkeleton() {
    const navigate = useNavigate();
    return (
        <div className="max-w-2xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-6 mb-8">
                <div className="flex-grow">
                    <Button 
                        onClick={() => navigate('/')} 
                        className="mb-6 !px-4 py-2 text-sm text-black font-medium bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors shadow-sm"
                    >
                        ← Back
                    </Button>
                    <Skeleton className="w-3/4 h-10 mb-4" />
                    <Skeleton className="w-24 h-7 rounded-full" />
                </div>
                <div className="flex flex-row gap-3">
                    <Button 
                        className="flex-1 text-white sm:flex-none !px-5 sm:!px-6 !py-3 flex items-center justify-center gap-2 shadow-sm"
                    >
                        Edit Task
                    </Button>
                    <Button 
                        className="!px-5 sm:!px-6 !py-3 flex-1 sm:flex-none flex items-center justify-center gap-2 shadow-sm !bg-red-500/20 !text-red-500 border !border-red-500 hover:!bg-red-500/30 transition-all"
                    >
                        Delete
                    </Button>
                </div>
            </div>
            <div className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-100 shadow-sm min-h-[300px]">
                <div className="space-y-4">
                    <Skeleton className="w-full h-6" />
                    <Skeleton className="w-full h-6" />
                    <Skeleton className="w-2/3 h-6" />
                </div>
            </div>
        </div>
    );
}

export function EditTaskSkeleton() {
    const navigate = useNavigate();
    const { id } = useParams();
    return (
        <div className="max-w-2xl mx-auto">
            <Button 
                    onClick={() => navigate(`/task/${id}`)}
                    className="mb-2 !px-4 py-2 text-sm text-black font-medium bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors shadow-sm"
                >
                    ← Back
            </Button>
            <div className="mb-4">
                <h1 className="text-3xl font-bold text-dark">Edit Task</h1>
            </div>
            <div className="space-y-6 bg-card-bg border border-card-border p-8 rounded-2xl shadow-sm">
                <div className="space-y-2">
                    <Skeleton className="w-12 h-4" />
                    <Skeleton className="w-full h-[50px] rounded-xl" />
                </div>

                <div className="space-y-2">
                    <Skeleton className="w-14 h-4" />
                    <Skeleton className="w-full h-[50px] rounded-xl" />
                </div>

                <div className="space-y-2">
                    <Skeleton className="w-20 h-4" />
                    <Skeleton className="w-full h-[140px] rounded-xl" />
                </div>

                <div className="flex gap-4 pt-4">
                    <Skeleton className="flex-1 h-[44px] rounded-xl" />
                    <Skeleton className="flex-1 h-[44px] rounded-xl" />
                </div>
            </div>
        </div>
    ); 
}