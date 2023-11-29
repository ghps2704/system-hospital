const express = require('express');
const tasksController = require('../controllers/tasksController');

const router = express.Router();

// Rota para obter todas as tarefas
router.get('/tasks', tasksController.getAllTasks);

// Outras rotas CRUD para tarefas podem ser adicionadas aqui

module.exports = router;
