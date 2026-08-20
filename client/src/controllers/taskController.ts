import { TaskStatus } from "../utils/enums";

const API_BASE_URL = `${import.meta.env.VITE_API_URL}/tasks`;

// for testing skeleton loading or effect
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const taskController = {
    
    // get all tasks
    getAllTasks: async () => {
        try {
            
            const response = await fetch(API_BASE_URL);
            if (!response.ok) throw new Error('Failed to get tasks');
            const result = await response.json();
            await delay(1500);
            return result.data;
        } catch (error) {
            console.error("TaskController.getAllTasks Error:", error);
            throw error;
        }
    },

    // get a task
    getTaskById: async (id: string | number) => {
        try {
            const response = await fetch(`${API_BASE_URL}/${id}`);
            if (!response.ok) throw new Error('Task not found');
            
            const result = await response.json();
            await delay(1500);
            return result.data;
        } catch (error) {
            console.error("TaskController.getTaskById Error:", error);
            throw error;
        }
    },

    // create a task
    createTask: async (taskData: { title: string; description?: string; status: string }) => {
        try {
            const response = await fetch(API_BASE_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(taskData),
            });
            
            const result = await response.json();
            if (!response.ok) {
                const errorMessage = Array.isArray(result.message) 
                    ? result.message[0]?.message 
                    : result.message;
                throw new Error(errorMessage || 'Failed to create task');
            }

            return result.data;
        } catch (error) {
            console.error("TaskController.createTask Error:", error);
            throw error;
        }
    },

    // update a task
    updateTask: async (id: number, taskData: { title?: string; description?: string; status?: string }) => {
        try {
            const data = {
                ...taskData,
                status: taskData.status ? taskData.status.toLowerCase() : TaskStatus.INCOMPLETE
            };

            const response = await fetch(`${API_BASE_URL}/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            
            const result = await response.json();
            if (!response.ok) {
                const errorMessage = Array.isArray(result.message) 
                    ? result.message[0]?.message 
                    : result.message;
                throw new Error(errorMessage || 'Failed to update task');
            }

            return result.data;
        } catch (error) {
            console.error("TaskController.updateTask Error:", error);
            throw error;
        }
    },

    // delete a task
    deleteTask: async (id: number) => {
        try {
            const response = await fetch(`${API_BASE_URL}/${id}`, {
                method: 'DELETE',
            });
            const result = await response.json();
            if (!response.ok) throw new Error(result.message || 'Failed to delete task');
            return result.data;
        } catch (error) {
            console.error("TaskController.deleteTask Error:", error);
            throw error;
        }
    },

    // filter tasks
    filterTasks: async (search: string = "", status: string = "", page: number = 1, limit: number = 6) => {
        try {
            const offset = (page - 1) * limit; // skip pages outside of the current page
            const query = new URLSearchParams({ 
                search, 
                status, 
                limit: limit.toString(), 
                offset: offset.toString() 
            }).toString();
            
            const response = await fetch(`${API_BASE_URL}/search?${query}`);
            if (!response.ok) throw new Error('Failed to filter tasks');
            
            const result = await response.json();
            await delay(1500);
            return result.data;
        } catch (error) {
            console.error("TaskController.filterTasks Error:", error);
            throw error;
        }
    }
};