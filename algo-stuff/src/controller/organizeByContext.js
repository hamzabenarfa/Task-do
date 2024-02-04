const { format, addMinutes, parse, isBefore, isAfter, isWithinInterval } = require('date-fns');

function organizeByContext(tasks, context, startTime, endTime) {
    const formatString = 'HH:mm';
    const parsedStartTime = parse(startTime, formatString, new Date());
    const parsedEndTime = parse(endTime, formatString, new Date());
    const timeInterval = { start: parsedStartTime, end: parsedEndTime };

    const filteredTasks = tasks.filter(task => {
        if (task.context !== context) return false;
        const taskStartTime = parse(task.start_at, formatString, new Date());
        const taskEndTime = addMinutes(taskStartTime, task.duration);
        return isWithinInterval(taskStartTime, timeInterval) || isWithinInterval(taskEndTime, timeInterval);
    });

    const sortedTasks = filteredTasks.sort((a, b) => {
        return parse(a.start_at, formatString, new Date()) - parse(b.start_at, formatString, new Date());
    });

    let organizedTasks = [];
    for (const task of sortedTasks) {
        const taskStartTime = parse(task.start_at, formatString, new Date());
        const originalTaskEndTime = addMinutes(taskStartTime, task.duration);

        if (isBefore(originalTaskEndTime, parsedStartTime) || isAfter(taskStartTime, parsedEndTime)) {
            continue;
        }

        const adjustedStartTime = isBefore(taskStartTime, parsedStartTime) ? parsedStartTime : taskStartTime;
        const adjustedEndTime = isAfter(originalTaskEndTime, parsedEndTime) ? parsedEndTime : originalTaskEndTime;

        if (isAfter(adjustedStartTime, parsedEndTime)) {
            continue;
        }

      
        organizedTasks.push({
            id: task.id,
            task: task.task,
            priority: task.priority,
            duration: task.duration,
            context: task.context,
            start_at: format(adjustedStartTime, formatString),
            end_at: format(adjustedEndTime, formatString)
        });
    }

    const organizedData = {
        start: format(parsedStartTime, formatString),
        end: format(parsedEndTime, formatString),
        context: context,
        tasks: organizedTasks
    };

    return organizedData;
}

module.exports = organizeByContext;
