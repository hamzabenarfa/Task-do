const { addMinutes, compareAsc, parse, isWithinInterval } = require('date-fns');

function organizeByContext(schedule, tasks, context, startTime, endTime) {
    const currentDate = new Date();
    const format = 'HH:mm'; // Time format

    // Parse start and end times to be today with specified hours and minutes
    const contextStartTime = parse(startTime, format, currentDate);
    const contextEndTime = parse(endTime, format, currentDate);

    const contextTasks = tasks
        .filter(task => task._context === context)
        .sort((a, b) => a._priority - b._priority || a._duration - b._duration);

    let currentTime = contextStartTime;
    const scheduledTasks = [];
    let overflowTasks = []; // For tasks that don't fit in the initial time frame

    for (const task of contextTasks) {
        // Check for any appointments that would conflict with the current task
        const conflictingAppointment = schedule.find(slot =>
            slot._isAppointment &&
            isWithinInterval(currentTime, {
                start: new Date(slot._startAt),
                end: new Date(slot._endAt)
            })
        );

        // Adjust currentTime if there's a conflicting appointment
        if (conflictingAppointment) {
            currentTime = new Date(conflictingAppointment._endAt); // Ensure currentTime is a Date object
        }

        // Schedule the task or move it to overflow if it doesn't fit in the current context time frame
        if (compareAsc(addMinutes(currentTime, task._duration), contextEndTime) <= 0) {
            scheduledTasks.push({
                ...task,
                _startAt: currentTime.toISOString(),
                _endAt: addMinutes(currentTime, task._duration).toISOString()
            });
            currentTime = addMinutes(currentTime, task._duration);
        } else {
            // If the task doesn't fit, add it to the overflow array
            overflowTasks.push(task);
            break; // Assuming we stop scheduling once we hit the first task that doesn't fit
        }
    }

    // Prepare the result object(s)
    const results = [{
        context,
        start: contextStartTime.toISOString(),
        end: scheduledTasks.length > 0 ? scheduledTasks[scheduledTasks.length - 1]._endAt : startTime,
        scheduledTasks,
    }];

    // Handle overflow tasks if any
    if (overflowTasks.length > 0) {
        // Assuming overflow tasks start immediately after the last scheduled task or the contextEndTime
        const overflowStart = scheduledTasks.length > 0 ? scheduledTasks[scheduledTasks.length - 1]._endAt : contextEndTime;
        results.push({
            context:"overflow",
            start: overflowStart,
            end: addMinutes(new Date(overflowStart), overflowTasks.reduce((acc, task) => acc + task._duration, 0)).toISOString(),
            scheduledTasks: overflowTasks.map(task => ({
                ...task,
                _startAt: overflowStart, // This assumes all overflow tasks start at the same time, which may need adjustment
                _endAt: addMinutes(new Date(overflowStart), task._duration).toISOString()
            })),
        });
    }

    return results.length === 1 ? results[0] : results; // Return a single object or an array of objects
}

module.exports = organizeByContext;
/**
 * 
 * after finding an appointment and there is no available time slot before it 
 * it push other tasks to overflow
 * 
 */