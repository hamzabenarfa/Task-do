const { format, addMinutes, parse, isBefore, isAfter } = require('date-fns');
const parseTime = require('./parseTime.js');

function organizeByContext(tasks,gaps, context, startTime, endTime) {
    const formatString = 'HH:mm';
    const parsedStartTime = parseTime(startTime, formatString);
    const parsedEndTime = parseTime(endTime, formatString);

    const filteredTasks = tasks.filter(task => {
        if (task.context !== context) return false;
        const taskStartTime = parseTime(task.start_at, formatString);
        const taskEndTime = addMinutes(taskStartTime, task.duration);
        return isBefore(taskStartTime, parsedEndTime) && isAfter(taskEndTime, parsedStartTime);
    });

    const sortedTasks = filteredTasks.sort((a, b) => {
        return parseTime(a.start_at, formatString) - parseTime(b.start_at, formatString);
    });

    let lastEndTime = parsedStartTime;
    const organizedTasks = sortedTasks.map(task => {
        const taskStartTime = lastEndTime;
        const taskEndTime = addMinutes(taskStartTime, task.duration);

        if (isAfter(taskEndTime, parsedEndTime)) {
            return null;
        }

        lastEndTime = taskEndTime;

        return {
            id: task.id,
            task: task.task,
            priority: task.priority,
            duration: task.duration,
            context: task.context,
            start_at: format(taskStartTime, formatString),
            end_at: format(taskEndTime, formatString)
        };
    }).filter(task => task !== null);

    const organizedData = {
        start: format(parsedStartTime, formatString),
        end: format(parsedEndTime, formatString),
        context: context,
        tasks: organizedTasks
    };

    return organizedData;
}


module.exports = organizeByContext;
