const { addMinutes } = require('date-fns');

function fillTimeSlots(timeSlots, sortedTasks) {
    const result = [];
    const alreadyScheduled = new Set();  // Create a set to keep track of used task IDs

    timeSlots.map((timeSlot, index) => {
        if (!timeSlot._isAppointments) {
            const filled = fillTimeSlot(timeSlot, [...sortedTasks], alreadyScheduled);
            result.push(filled);
            
        } 
        // else {  console.log("appointment")
        //         result.push(timeSlot)}
    });
    return result;
}

function fillTimeSlot(timeSlot, remainingData, alreadyScheduled) {

    const res = [];
    const addedIds = new Set();
    let currentTime = timeSlot._startAt;

    while (remainingData.length > 0 && timeSlot.duration > 0) {
        const data = remainingData[0];

        if (timeSlot.duration - data._duration >= 0 && !addedIds.has(data._id) && !alreadyScheduled.has(data._id)) {
            const taskStart = currentTime;
            
            currentTime = addMinutes(currentTime, data._duration);
            const taskEnd = currentTime;

            const taskWithTime = {
                ...data,
                start_at: taskStart,
                end_at: taskEnd
            };
            timeSlot.duration = timeSlot.duration - data._duration;
       
            res.push(taskWithTime);
            addedIds.add(data._id);
            alreadyScheduled.add(data._id);
        } else {
        }
        remainingData.shift();
    }


    return res;
}

module.exports = fillTimeSlots;
