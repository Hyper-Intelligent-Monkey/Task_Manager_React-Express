import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import TaskForm from "../../components/TaskForm";
import { Button } from "../../components/Button";
import { taskController } from "../../controllers/taskController";
import { useToast } from "../../components/Toast";
import { EditTaskSkeleton } from "../../components/SkeletonLoading";
import { handleApiError } from "../../utils/errorHandlers";

export default function EditTaskPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { showToast } = useToast();
    const [task, setTask] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        const loadTask = async () => {
            try {
                if (id) {
                    const data = await taskController.getTaskById(id);
                    setTask(data);
                }
            } catch (err) {
                handleApiError(err, showToast, "Task not found");
                navigate("/");
            } finally {
                setLoading(false);
            }
        };
        loadTask();
    }, []);

    const handleUpdate = async (updatedData: any) => {
        if (!id) return;
        setSaving(true);
        try {
            await taskController.updateTask(parseInt(id), updatedData);
            showToast("Task Successfully Edited", "success");
            navigate(`/task/${id}`);
        } catch (err: any) {
            showToast(err.message || "Failed to update task", "error");
        } finally {
            setSaving(false);
        }
    };

    return (
        <main className="flex-grow max-w-5xl mx-auto w-full px-6 my-6 animate-slide-up">
            {loading ? (
                <EditTaskSkeleton />
            ) : task ? (
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

                    {task && (
                        <TaskForm 
                            initialData={task} 
                            onSubmit={handleUpdate} 
                            onCancel={() => navigate(`/task/${id}`)} 
                            isLoading={saving}
                            submitLabel="Save Changes"
                        />
                    )}
                </div>
            ) : null}
        </main>
    );
}