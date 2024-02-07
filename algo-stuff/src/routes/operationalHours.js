const router = require('express').Router();
const createOpertionalHoursData = require('../service/operationalHours');

router.post('/create', async (req, response) => {
    const opertionalHoursData = req.body; 
    try {
        const newOpertionalHours = await createOpertionalHoursData(opertionalHoursData);
        response.json(newOpertionalHours);
    } catch (error) {
        console.error('Error in POST /create:', error);
        response.status(500).json({ error: 'Error creating opertionalHours' });
    }
});


module.exports = router;
