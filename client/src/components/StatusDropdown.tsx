import { useState, useRef, useEffect } from "react";
import { TaskStatus, TaskStatusLabel } from "../utils/enums";

interface StatusProps {
    currentFilter?: TaskStatus;
    showAllOption?: boolean;
    onSelect?: (status: TaskStatus) => void;
}

export default function StatusDropdown({ 
    currentFilter = TaskStatus.ALL, 
    showAllOption = true,
    onSelect 
}: StatusProps) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSelect = (status: TaskStatus) => {
        onSelect?.(status);
        setIsOpen(false);
    };

    return (
            <div 
                ref={dropdownRef} 
                className="relative w-fit text-dark"
                onMouseLeave={() => setIsOpen(false)}
            >
                <button 
                    type="button"
                    name="Task Status"
                    onClick={() => setIsOpen(!isOpen)}
                    className={`flex justify-between items-center gap-6 border text-sm rounded-lg !py-2 px-3 outline-none transition-all shadow-sm bg-card-bg ${
                        isOpen ? "border-accent text-accent" : "border-card-border text-text hover:border-accent hover:text-accent"
                    }`}
                >
                    <span className="text-dark capitalize">{TaskStatusLabel[currentFilter]}</span>
                    <div className="">
                        <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`} 
                            fill="none" viewBox="0 0 24 24" stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                        </svg>
                    </div>
                </button>

                <div className={`absolute top-full left-0 min-w-full w-max pt-2 z-50 transition-all ${
                    isOpen ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-2"
                }`}>
                    <div className="text-dark bg-white border border-card-border rounded-lg shadow-xl overflow-hidden py-1 min-w-[140px]">
                        {showAllOption && (
                            <button 
                                type="button"
                                onClick={() => handleSelect(TaskStatus.ALL)}
                                className="w-full text-left px-4 py-2.5 text-sm hover:bg-accent/5 hover:text-accent transition-colors flex items-center gap-3 font-medium"
                            >
                                <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                                {TaskStatusLabel[TaskStatus.ALL]}
                            </button>
                        )}
                        <button 
                            type="button"
                            onClick={() => handleSelect(TaskStatus.COMPLETE)}
                            className="w-full text-left px-4 py-2.5 text-sm hover:bg-accent/5 hover:text-accent transition-colors flex items-center gap-3 font-medium"
                        >
                            <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                            {TaskStatusLabel[TaskStatus.COMPLETE]}
                        </button>
                        <button 
                            type="button"
                            onClick={() => handleSelect(TaskStatus.INCOMPLETE)}
                            className="w-full text-left px-4 py-2.5 text-sm hover:bg-accent/5 hover:text-accent transition-colors flex items-center gap-3 font-medium"
                        >
                            <div className="w-1.5 h-1.5 rounded-full bg-yellow-500" />
                            {TaskStatusLabel[TaskStatus.INCOMPLETE]}
                        </button>
                    </div>
                </div>
            </div>
    );
}