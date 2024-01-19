const { addMinutes, format } = require('date-fns');

function fillGaps(gaps, sortedRemainingData, start, end) {
    const result = [];
    const usedIds = new Set();  // Create a set to keep track of used task IDs

    for (const gap of gaps) {
        if (gap.duration !== null) {
            // Pass a copy of sortedRemainingData and the set of used IDs
            const filled = fillGap(gap.start_at, gap.end_at, gap.duration, [...sortedRemainingData], usedIds); 
            result.push(filled);
            continue;
        }
        result.push(gap);
    }

    console.log(result);
}

function fillGap(start, end, duration, remainingData, usedIds) {
    const res = [];
    const addedIds = new Set();
    let currentTime = parseTime(start);

    while (remainingData.length > 0 && duration > 0) {
        const data = remainingData[0];

        if (duration - data.duration >= 0 && !addedIds.has(data.id) && !usedIds.has(data.id)) {
            const taskStart = format(currentTime, 'HH:mm');
            currentTime = addMinutes(currentTime, data.duration);
            const taskEnd = format(currentTime, 'HH:mm');

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

// Helper function to parse a time string (HH:mm) into a Date object
function parseTime(time) {
    const [hours, minutes] = time.split(':').map(Number);
    const date = new Date();
    date.setHours(hours, minutes, 0, 0);
    return date;
}

module.exports = fillGaps;
