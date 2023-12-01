const express = require('express');
const doctorsController = require('../controllers/doctorsController');

const router = express.Router();

router.get('/doctors', doctorsController.getAllDoctors);
router.post('/doctors/create', doctorsController.createDoctors);
router.put('/doctors/:id', doctorsController.updateDoctor);
router.delete('/doctors/:doctorId', doctorsController.deleteDoctor);


module.exports = router;
