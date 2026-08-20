const db = require('../config/db');

// get all tasks
exports.getAllTasks = async () => {
    const result = await db.query('SELECT * FROM tasks ORDER BY id DESC');
    return result.rows;
};

// get a task
exports.getTaskById = async (id) => {
    const result = await db.query('SELECT * FROM tasks WHERE id = $1', [id]);
    return result.rows[0];
};

// create a task
exports.createTask = async (title, description, status) => {
    const result = await db.query(
        'INSERT INTO tasks (title, description, status) VALUES ($1, $2, $3) RETURNING *', 
        [title, description, status]
    );
    return result.rows[0];
};

// update a task
exports.updateTask = async (id, title, description, status) => {
    const result = await db.query(
        'UPDATE tasks SET title = $1, description = $2, status = $3 WHERE id = $4 RETURNING *', 
        [title, description, status, id]
    );
    return result.rows[0];
};

// delete a task
exports.deleteTask = async (id) => {
    const result = await db.query('DELETE FROM tasks WHERE id = $1 RETURNING *', [id]);
    return result.rows[0];
};

// filter tasks with conditions
exports.filterTasks = async (search, status, limit, offset) => {
    const tasksQuery = `
        SELECT * FROM tasks 
        WHERE LOWER(title) LIKE LOWER($1) AND LOWER(status) LIKE LOWER($2)
        ORDER BY id DESC LIMIT $3 OFFSET $4`;
    
    const countQuery = `
        SELECT COUNT(*) FROM tasks 
        WHERE LOWER(title) LIKE LOWER($1) AND LOWER(status) LIKE LOWER($2)`;

    const [tasks, count] = await Promise.all([
        db.query(tasksQuery, [`%${search}%`, `%${status}%`, limit, offset]),
        db.query(countQuery, [`%${search}%`, `%${status}%`]),
    ]);

    return {
        tasks: tasks.rows,
        totalCount: parseInt(count.rows[0].count)
    };
};
