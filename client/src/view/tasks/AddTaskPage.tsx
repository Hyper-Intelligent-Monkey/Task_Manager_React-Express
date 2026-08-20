import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TaskForm from "../../components/TaskForm";
import { Button } from "../../components/Button";
import { taskController } from "../../controllers/taskController";
import { useToast } from "../../components/Toast";

export default function AddTaskPage() {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (data: any) => {
    setLoading(true);
    try {
        await taskController.createTask(data);
        showToast("Task Successfully Created", "success");
        navigate("/");
    } catch (err: any) {
        showToast(err.message, "error");
    } finally {
        setLoading(false);
    }
  };

  return (
    <>
      <main className="flex-grow max-w-5xl mx-auto w-full px-6 my-6 animate-slide-up">
        <div className="max-w-2xl mx-auto">
          <Button 
              onClick={() => navigate('/')} 
              className="mb-2 !px-4 py-2 text-sm !text-dark font-medium bg-nav-bg border border-nav-border rounded-lg hover:bg-slate-50 transition-colors shadow-sm"
          >
              ← Back
          </Button>
          <div className="mb-4">
            <h1 className="text-3xl font-bold text-dark mb-2">Add New Task</h1>
          </div>

          <TaskForm 
            onSubmit={handleSubmit} 
            onCancel={() => navigate("/")} 
            isLoading={loading}
            submitLabel="Create Task"
          />
        </div>
      </main>
    </>
  );
}