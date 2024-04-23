const express = require('express');

const appointmentController = require('../controllers/appointment');

const router = express.Router();

router.post('/add-appointment',appointmentController.postAddAppointment);

router.get('/get-appointments',appointmentController.getAppointments);

router.delete('/delete-appointment/:id',appointmentController.deleteAppointment);

module.exports = router;