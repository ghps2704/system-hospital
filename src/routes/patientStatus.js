const express = require('express');
const patientStatusController = require('../controllers/patientStatusController');

const router = express.Router();

// Rota para obter todos os status dos pacientes
router.get('/patient-status', patientStatusController.getAllPatientStatus);

// Outras rotas CRUD para status dos pacientes podem ser adicionadas aqui

module.exports = router;
