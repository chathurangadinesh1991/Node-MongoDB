
const express = require('express');
const employeeController = require('../controllers/employeeController');
const router = express.Router();

router
    .route('/get-personal-data')
    .get(employeeController.getPersonalData);

module.exports = router;  