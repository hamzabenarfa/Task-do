// routes/task.js
const router = require('express').Router();
const createTask = require('../service/task');

router.post('/create', async (req, response) => {
    const taskData = req.body; 
    try {
        const newTask = await createTask(taskData);
        response.json(newTask);
    } catch (error) {
        console.error('Error in POST /create:', error);
        response.status(500).json({ error: 'Error creating task' });
    }
});

router.get('/get', async (req, response) => {
    try {
        const tasks = await getTasks();
        response.json(tasks);
    } catch (error) {
        console.error('Error in GET /get:', error);
        response.status(500).json({ error: 'Error getting tasks' });
    }
});

module.exports = router;
