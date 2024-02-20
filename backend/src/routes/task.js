const router = require('express').Router();
const {createTask ,getAllTasks} = require('../controller/task');

router.post('/create', async (req, response) => {
    const taskData = req.body; 
    try {
        const userId = req.user.id; 
        const newTask = await createTask(userId, taskData);
        response.json(newTask);
    } catch (error) {
        console.error('Error in POST /create:', error);
        response.status(500).json({ error: 'Error creating task' });
    }
});


router.get('/get', async (req, response) => {
    try {
        const userId = req.user.id;
        const tasks = await getAllTasks(userId);
        response.json(tasks);
    } catch (error) {
        console.error('Error in GET /get:', error);
        response.status(500).json({ error: 'Error getting tasks' });
    }
});

module.exports = router;
