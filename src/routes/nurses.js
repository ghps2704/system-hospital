const express = require('express');
const nursesController = require('../controllers/nursesController');

const router = express.Router();

router.get('/nurses', nursesController.getAllNurses);
router.post('/nurses/create', nursesController.createNurse);
router.put('/nurses/:id', nursesController.updateNurse);
router.delete('/nurses/:nurseId', nursesController.deleteNurse);


module.exports = router;
