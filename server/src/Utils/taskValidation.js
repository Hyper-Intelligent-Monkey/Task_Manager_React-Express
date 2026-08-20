const { z } = require('zod');


const taskSchema = z.object({
    title: z.string({
        required_error: "Title is required",
    })
        .trim()
        .min(1, "Title is required")
        .min(3, "Title is too short")
        .max(100, "Title is too long"),    
    description: z.string()
        .max(1000, "Description cannot exceed 1000 characters")
        .optional()
        .default(""),
    status: z.enum(['completed', 'incomplete'])
        .default('incomplete')
});

module.exports = { taskSchema };