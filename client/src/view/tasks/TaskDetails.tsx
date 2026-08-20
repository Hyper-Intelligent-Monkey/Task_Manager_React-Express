import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "../../components/Button";
import DeleteModal from "../../components/DeleteModal";
import { taskController } from "../../controllers/taskController";
import { TaskStatusLabel, TaskStatus } from "../../utils/enums";
import { useToast } from "../../components/Toast";
import { TaskDetailsSkeleton } from "../../components/SkeletonLoading";
import { handleApiError } from "../../utils/errorHandlers";

export default function TaskDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { showToast } = useToast();
    const [task, setTask] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    useEffect(() => {
        const loadTask = async () => {
            try {
                if (id) {
                    const data = await taskController.getTaskById(id);
                    setTask(data);
                }
            } catch (err: any) {
                handleApiError(err, showToast, "Task not found");
                navigate("/");
            } finally {
                setLoading(false);
            }
        };
        loadTask();
    }, []);

    const handleDelete = async () => {
        if (!id) return;
        try {
            await taskController.deleteTask(parseInt(id));
            showToast("Task Successfully Deleted", "success");
            navigate("/");
        } catch (err) {
            showToast("Failed to delete task", "error");
        }
    };


    return (
        <>
            <main className="flex-grow max-w-5xl mx-auto w-full px-6 my-6 animate-slide-up">
            {loading ? (
                <TaskDetailsSkeleton />
            ) : task ? (
                
                    <div className="max-w-2xl mx-auto">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-6 mb-8">
                        <div className="flex-grow">
                            <Button 
                                onClick={() => navigate('/')} 
                                className="mb-6 !px-4 py-2 text-sm text-black font-medium bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors shadow-sm"
                            >
                                ← Back
                            </Button>
                            <h1 className="text-3xl sm:text-4xl font-bold text-dark mb-4 break-words">{task.title}</h1>
                            <span className={`inline-flex items-center px-4 py-1 rounded-full text-sm font-semibold border ${
                                task.status === TaskStatus.COMPLETE 
                                ? 'bg-green-500/10 text-green-500 border-green-500' 
                                : 'bg-yellow-500/10 text-yellow-500 border-yellow-500'
                            }`}>
                                {TaskStatusLabel[task.status as TaskStatus] || task.status}
                            </span>
                        </div>

                        <div className="flex flex-row gap-3">
                            <Button 
                                onClick={() => navigate(`/edit/${task.id}`)}
                                className="flex-1 text-white sm:flex-none !px-5 sm:!px-6 !py-3 flex items-center justify-center gap-2 shadow-sm"
                            >
                                Edit Task
                            </Button>
                            <Button 
                                onClick={() => setIsDeleteModalOpen(true)}
                                className="!px-5 sm:!px-6 !py-3 flex-1 sm:flex-none flex items-center justify-center gap-2 shadow-sm !bg-red-500/20 !text-red-500 border !border-red-500 hover:!bg-red-500/30 transition-all"
                            >
                                Delete
                            </Button>
                        </div>
                    </div>
                
                    {!task.description?.trim() ? null : (
                        <div className="bg-white p-6 sm:p-10 rounded-3xl border border-card-border shadow-sm min-h-[300px]">
                            <p className="text-md sm:text-lg text-text whitespace-pre-wrap leading-relaxed">
                                {task.description}
                            </p>
                        </div>
                    )}
                    </div>
            ) : null}
            </main>

            <DeleteModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={handleDelete}
            />
        </>
    );
}
