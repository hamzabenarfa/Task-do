const router = require('express').Router();
const createAppointment = require('../service/appointment');

router.post('/create', async (req, response) => {
    const appointmentData = req.body; 
    try {
        const newAppointment = await createAppointment(appointmentData);
        response.json(newAppointment);
    } catch (error) {
        console.error('Error in POST /create:', error);
        response.status(500).json({ error: 'Error creating appointment' });
    }
});


module.exports = router;
