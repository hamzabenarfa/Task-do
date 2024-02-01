const express = require('express');
const app = express();
app.use(express.json());

const taskManager = new TaskManager();
const gapFinder = new GapFinder();
const gapFiller = new GapFiller();

// Endpoint to add a task
app.post('/addTask', (req, res) => {
    const { id, task, start_at, duration, context, priority } = req.body;
    const newTask = new Task(id, task, start_at, duration, context, priority);
    taskManager.addTask(newTask);
    res.send({ message: 'Task added successfully' });
});

// Endpoint to get the schedule
app.get('/schedule', (req, res) => {
    const sortedTasks = taskManager.getSortedTasks();
    const { sortedMeetings, sortedRemainingTasks } = sortedTasks;
    const gaps = gapFinder.findGaps(sortedMeetings, { start: '08:00', end: '18:00' });
    const schedule = gapFiller.fillGaps(gaps, sortedRemainingTasks);
    res.send(schedule);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
