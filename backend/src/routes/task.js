const router = require('express').Router();
const {createTask ,getAllTasks,deleteTask,updateTask} = require('../controller/task');

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

router.delete('/delete/:id', async (req, response) => {
    try {
        const taskId = req.params.id;
        const task = await deleteTask(taskId);
        response.json(task);
    } catch (error) {
        console.error('Error in DELETE /delete:', error);
        response.status(500).json({ error: 'Error deleting task' });
    }
});

router.put('/update/:id', async (req, response) => {
    try {
        const taskId = parseInt(req.params.id);
        const taskData = req.body;
        const task = await updateTask(taskId, taskData);
        response.json(task);
    } catch (error) {
        console.error('Error in UPDATE /update:', error);
        response.status(500).json({ error: 'Error updating task' });
    }
});

module.exports = router;
