const express = require('express');
const adminController = require('../controllers/adminsController');

const router = express.Router();


router.get('/admins', adminController.getAllAdmins);
router.post('/admins/create', adminController.createAdmins);
router.put('/admins/:id', adminController.updateAdmin);
router.delete('/admins/:adminId', adminController.deleteAdmin);

module.exports = router;
