const express = require('express');
const router = express.Router();
const taskController = require('../Controllers/taskController');

// task routes (Base path is /api/tasks defined in app.js)
router.get('/', taskController.getTasks);
router.get('/search', taskController.filterTasks);
router.get('/:id', taskController.getTask);
router.post('/', taskController.createTask);
router.put('/:id', taskController.updateTask);
router.delete('/:id', taskController.deleteTask);

module.exports = router;