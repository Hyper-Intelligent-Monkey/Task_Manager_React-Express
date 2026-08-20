import { useNavigate } from "react-router-dom";
import { TaskStatus, TaskStatusLabel } from "../utils/enums";

// 1. Define the "Blueprint" for the data the card needs
interface TaskCardProps {
    id: number;
    title: string;
    description: string;
    status: TaskStatus | string;
    index?: number;
}

export default function TaskCard({ id, title, description, status, index = 0 }: TaskCardProps) {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/task/${id}`);
    };

    const getLabel = (s: any) => {
        return TaskStatusLabel[s as TaskStatus] || s;
    };

    return (
        <div 
            onClick={handleClick}
            className="h-[220px] lg:h-[232px] rounded-xl bg-card-bg border border-card-border p-6 flex flex-col cursor-pointer hover:border-accent transition-all group"
            style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'both' }}
        >
            <div className="mb-3">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                    status.toLowerCase() === TaskStatus.COMPLETE 
                    ? 'bg-green-500/10 border-green-500 text-green-500' 
                    : status.toLowerCase() === TaskStatus.INCOMPLETE
                    ? 'bg-yellow-500/10 border-yellow-500 text-yellow-500'
                    : 'bg-gray-500/10 border-gray-500 text-gray-500'
                }`}>
                    {getLabel(status)}
                </span>
            </div>
            <h3 className="text-lg font-bold text-dark mb-2 line-clamp-2 group-hover:text-accent transition-colors">
                {title}
            </h3>
            <p className="text-sm text-text line-clamp-3 lg:line-clamp-4 whitespace-pre-wrap">
                {description}
            </p>
        </div>
    );
}