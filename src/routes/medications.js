const express = require('express');
const medicationsController = require('../controllers/medicationsController');

const router = express.Router();

// Rota para obter todos os medicamentos
router.get('/medications', medicationsController.getAllMedications);

// Outras rotas CRUD para medicamentos podem ser adicionadas aqui

module.exports = router;
