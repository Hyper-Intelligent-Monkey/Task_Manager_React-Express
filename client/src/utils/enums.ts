export const TaskStatus = {
    ALL: "all",
    INCOMPLETE: "incomplete",
    COMPLETE: "completed",
} as const;

export type TaskStatus = typeof TaskStatus[keyof typeof TaskStatus];

export const TaskStatusLabel: Record<TaskStatus, string> = {
    [TaskStatus.ALL]: "All Tasks",
    [TaskStatus.INCOMPLETE]: "Incomplete",
    [TaskStatus.COMPLETE]: "Completed"
};
