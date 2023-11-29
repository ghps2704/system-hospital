const express = require('express');
const nursesController = require('../controllers/nursesController');

const router = express.Router();

// Rota para obter todos os enfermeiros
router.get('/nurses', nursesController.getAllNurses);

// Outras rotas CRUD para enfermeiros podem ser adicionadas aqui

module.exports = router;
