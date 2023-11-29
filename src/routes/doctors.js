const express = require('express');
const doctorsController = require('../controllers/doctorsController');

const router = express.Router();

router.get('/doctors', doctorsController.getAllDoctors);

// Outras rotas CRUD para médicos podem ser adicionadas aqui

module.exports = router;
