const express = require('express');
const tasksController = require('../controllers/tasksController');

const router = express.Router();

router.get('/tasks', tasksController.getAllTasks);
router.post('/tasks/create', tasksController.createTasks);
router.put('/tasks/:id', tasksController.updateTask);
router.delete('/tasks/:taskId', tasksController.deleteTask);


module.exports = router;
