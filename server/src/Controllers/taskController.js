const taskModel = require("../Models/taskModel");
const { taskSchema } = require("../Utils/taskValidation");

// get all tasks
exports.getTasks = async (req, res, next) => {
    try {
        const tasks = await taskModel.getAllTasks();
        res.status(200).json({
            success: true,
            data: tasks
        });
    } catch (e) {
        // next(e) passes the error to our new errorHandler.js automatically!
        next(e);
    }
};

// get a task
exports.getTask = async (req, res, next) => {
    const id = parseInt(req.params.id);
    try {
        const task = await taskModel.getTaskById(id);
        if (!task) {
            return res.status(404).json({ 
                success: false,
                message: "Task not found" 
            });
        }
        res.status(200).json({
            success: true,
            data: task
        });
    } catch (e) {
        next(e);
    }
};

// create a task
exports.createTask = async (req, res, next) => {
    try {
        const validatedData = taskSchema.parse(req.body);

        const newTask = await taskModel.createTask(
            validatedData.title, 
            validatedData.description, 
            validatedData.status
        );

        res.status(201).json({
            success: true,
            data: newTask
        });
    } catch (e) {
        next(e);
    }
};

// update a task
exports.updateTask = async (req, res, next) => {
    const id = parseInt(req.params.id);
    try {
        const validatedData = taskSchema.parse(req.body);

        const updatedTask = await taskModel.updateTask(
            id, 
            validatedData.title, 
            validatedData.description, 
            validatedData.status
        );

        if (!updatedTask) {
            return res.status(404).json({ 
                success: false,
                message: "Task not found" 
            });
        }

        res.status(200).json({
            success: true,
            data: updatedTask
        });
    } catch (e) {
        next(e);
    }
};

// delete a task
exports.deleteTask = async (req, res, next) => {
    const id = parseInt(req.params.id);
    try {
        const deletedTask = await taskModel.deleteTask(id);
        if (!deletedTask) {
            return res.status(404).json({ 
                success: false,
                message: "Task not found" 
            });
        }
        res.status(200).json({ 
            success: true,
            message: "Task deleted successfully", 
            data: deletedTask 
        });
    } catch (e) {
        next(e);
    }
};

// filter tasks
exports.filterTasks = async (req, res, next) => {
    const { search, status, limit, offset } = req.query;
    try {
        const formattedSearch = search ? search.toLowerCase() : "";
        const formattedStatus = status ? status.toLowerCase() : "";
        let parsedLimit = parseInt(limit) || 6;
        const MAX_LIMIT = 50; // safety limit
        if (parsedLimit > MAX_LIMIT) {
            parsedLimit = MAX_LIMIT;
        }
        const parsedOffset = parseInt(offset) || 0;
        
        const result = await taskModel.filterTasks(
            formattedSearch, 
            formattedStatus, 
            parsedLimit, 
            parsedOffset
        );
        
        res.status(200).json({
            success: true,
            data: result
        });
    } catch (e) {
        next(e);
    }
};
