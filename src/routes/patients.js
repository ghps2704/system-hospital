const express = require('express');
const patientsController = require('../controllers/patientsController');

const router = express.Router();

// Rota para obter todos os pacientes
router.get('/patients', patientsController.getAllPatients);

// Outras rotas CRUD para pacientes podem ser adicionadas aqui

module.exports = router;
