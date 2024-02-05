const { addMinutes } = require('date-fns');

function fillTimeSlots(timeSlots, sortedTasks) {
    const result = [];
    const alreadyScheduled = new Set(); // Create a set to keep track of used task IDs

    timeSlots.forEach((timeSlot) => {
        if (!timeSlot._isAppointment) {
            const clonedTimeSlot = { ...timeSlot, _scheduledItems: [...timeSlot._scheduledItems] };
            
            const filled = fillTimeSlot(clonedTimeSlot, [...sortedTasks], alreadyScheduled);
            result.push(filled);
        } else {
            result.push(timeSlot);
        }
    });

    return result;
}

function fillTimeSlot(timeSlot, remainingTasks, alreadyScheduled) {
    let currentTime = timeSlot._startAt;
    let remainingDuration = timeSlot._duration;

    while (remainingTasks.length > 0 && remainingDuration > 0) {
        const task = remainingTasks[0];

        if (remainingDuration - task._duration >= 0 && !alreadyScheduled.has(task._id)) {
            const taskStart = currentTime;

            currentTime = addMinutes(currentTime, task._duration);
            const taskEnd = currentTime;

            const taskWithTime = {
                ...task,
                start_at: taskStart,
                end_at: taskEnd
            };

            remainingDuration -= task._duration;
          
            timeSlot._scheduledItems.push(JSON.stringify(taskWithTime, null, 2));
            alreadyScheduled.add(task._id);
        }

        remainingTasks.shift();
    }

    timeSlot._duration = remainingDuration;

    return timeSlot;
}

module.exports = fillTimeSlots;
