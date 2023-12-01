const express = require('express');
const medicationsController = require('../controllers/medicationsController');

const router = express.Router();

router.get('/medications', medicationsController.getAllMedications);
router.post('/medications/create', medicationsController.createMedication);
router.put('/medications/:id', medicationsController.updateMedication);
router.delete('/medications/:medicationId', medicationsController.deleteMedication);

module.exports = router;
