const router = require('express').Router();
const createSchedule = require('../controller/schedule');
const {getTodaysOperationalHoursToday} = require('../controller/operationalHours');
const {getAllTasks} = require('../controller/task');


router.get('/get', async (req, response) => {
    try {
        const today = await getTodaysOperationalHoursToday();
        if(!today) {
            response.status(404).json({ error: 'No operational hours today' });
            return;
        }
        const userId = req.user.id;
        const myTasksData = await getAllTasks(userId);
        if(!myTasksData) {
            response.status(404).json({ error: 'No tasks today' });
            return;
        }
        const schedule = await createSchedule(today,myTasksData);
        response.json(schedule);
    } catch (error) {
        console.error('Error in GET /get:', error);
        response.status(500).json({ error: 'Error getting schedule' });
    }
});



module.exports = router;
