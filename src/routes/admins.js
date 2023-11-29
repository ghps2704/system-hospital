const express = require('express');
const adminController = require('../controllers/adminController');

const router = express.Router();

// Rota para obter todos os administradores
router.get('/admins', adminController.getAllAdmins);

// Outras rotas CRUD para administradores podem ser adicionadas aqui

module.exports = router;
