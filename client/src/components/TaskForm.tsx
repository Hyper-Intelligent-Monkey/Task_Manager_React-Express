import { useState } from "react";
import { TaskStatus } from "../utils/enums";
import StatusDropdown from "./StatusDropdown";
import { Button } from "./Button";
import { useToast } from "./Toast";

interface TaskFormData {
    title: string;
    description: string;
    status: Exclude<TaskStatus, typeof TaskStatus.ALL>;
}

interface TaskFormProps {
    initialData?: TaskFormData;
    onSubmit: (data: TaskFormData) => void;
    onCancel: () => void;
    isLoading?: boolean;
    submitLabel?: string;
}

export default function TaskForm({ 
    initialData, 
    onSubmit, 
    onCancel, 
    isLoading = false,
    submitLabel = "Save Task" 
}: TaskFormProps) {
    const { showToast } = useToast();
    const [formData, setFormData] = useState<TaskFormData>(initialData || {
        title: "",
        description: "",
        status: TaskStatus.INCOMPLETE,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        if (!formData.title.trim()) {
            showToast("Title is required", "error");
            return;
        }

        if (formData.title.trim().length < 3) {
            showToast("Title is short", "error");
            return;
        }

        if (formData.description.length > 1000) {
            showToast("Description is too long", "error");
            return;
        }

        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 bg-card-bg border border-card-border p-8 rounded-2xl shadow-sm">
            <div className="space-y-2">
                <label htmlFor="title" className="text-sm font-semibold text-dark">Title</label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Enter task title"
                    className="w-full px-4 py-3 rounded-xl border border-card-border focus:outline-none focus:ring-2 focus:ring-accent bg-white transition-all"
                />
            </div>

            <div className="space-y-2">
                <label className="text-sm font-semibold text-dark">Status</label>
                <StatusDropdown 
                    showAllOption={false} 
                    currentFilter={formData.status} 
                    onSelect={(status) => setFormData(prev => ({ ...prev, status: status as Exclude<TaskStatus, typeof TaskStatus.ALL> }))}
                />
            </div>

            <div className="space-y-2">
                <label htmlFor="description" className="text-sm font-semibold text-dark">Description</label>
                <textarea
                    id="description"
                    name="description"
                    rows={5}
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Enter task description"
                    className="w-full px-4 py-3 rounded-xl border border-card-border focus:outline-none focus:ring-2 focus:ring-accent bg-white resize-none"
                />
            </div>

            <div className="flex gap-4 pt-4">
                <Button
                    type="button"
                    onClick={onCancel}
                    className="flex-1 !bg-white !text-dark border border-card-border hover:!bg-gray-50"
                >
                    Cancel
                </Button>
                <Button 
                    type="submit" 
                    className="flex-1 text-white  shadow-md disabled:opacity-50"
                    disabled={isLoading}
                >
                    {isLoading ? "Processing..." : submitLabel}
                </Button>
            </div>
        </form>
    );
}