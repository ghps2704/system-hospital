const express = require('express');
const patientStatusController = require('../controllers/patientStatusController');

const router = express.Router();

router.get('/patient-status', patientStatusController.getAllPatientStatus);
router.post('/patient-status/create', patientStatusController.createPatientStatus);
router.put('/patient-status/:id', patientStatusController.updatePatientStatus);

module.exports = router;
