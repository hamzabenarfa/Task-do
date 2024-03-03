const router = require('express').Router();
const {createOperationalHours,getTodaysOperationalHoursToday,updateOperationalHours} = require('../controller/operationalHours');

router.post('/create', async (req, response) => {
    const opertionalHoursData = req.body; 
    try {
        const newOpertionalHours = await createOperationalHours(opertionalHoursData);
        response.json(newOpertionalHours);
    } catch (error) {
        console.error('Error in POST /create:', error);
        response.status(500).json({ error: 'Error creating opertionalHours' });
    }
});

router.get('/get', async (req, response) => {
    try {
        const opertionalHours = await getTodaysOperationalHoursToday();
        if(!opertionalHours) {
            response.status(404).json({ error: 'No operational hours today' });
            return;
        }
        response.json(opertionalHours);
    } catch (error) {
        console.error('Error in GET /get:', error);
        response.status(500).json({ error: 'Error getting opertionalHours' });
    }
});

router.put('/update/:id', async (req, response) => {
   const id = req.params.id;
   const opertionalHoursData = req.body;
   try {
        const updatedOpertionalHours = await updateOperationalHours(id,opertionalHoursData);
        response.json(updatedOpertionalHours);
    } catch (error) {
        console.error('Error in PUT /update:', error);
        response.status(500).json({ error: 'Error updating opertionalHours' });
    }
});


module.exports = router;
