const { addMinutes } = require('date-fns');

function fillTimeSlots(timeSlots, sortedTasks) {
    const result = [];
    const alreadyScheduled = new Set();  // Create a set to keep track of used task IDs

    timeSlots.map((timeSlot)=>{
        if(!timeSlot.isAppointments){
            const filled = fillTimeSlot(timeSlot, [...sortedTasks], alreadyScheduled); 
            result.push(filled);
        }
    })

    return result;
}

function fillTimeSlot({start, duration}, remainingData, usedIds) {
    const res = [];
    const addedIds = new Set();
    let currentTime = start;

    while (remainingData.length > 0 && duration > 0) {
        const data = remainingData[0];

        if (duration - data.duration >= 0 && !addedIds.has(data.id) && !usedIds.has(data.id)) {
            const taskStart = currentTime;
            currentTime = addMinutes(currentTime, data.duration);
            const taskEnd = currentTime;

            const taskWithTime = {
                ...data,
                start_at: taskStart,
                end_at: taskEnd
            };

            duration = duration - data.duration;
            res.push(taskWithTime);
            addedIds.add(data.id);
            usedIds.add(data.id);
        }
        remainingData.shift();
    }

    return res;
}



module.exports = fillTimeSlots;
