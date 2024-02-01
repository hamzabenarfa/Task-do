const { addMinutes, format } = require('date-fns');
const parseTime = require('./parseTime.js');

function fillGaps(gaps, sortedRemainingData, start, end) {
    const result = [];
    const usedIds = new Set();  // Create a set to keep track of used task IDs

    for (const gap of gaps) {
        if (gap.duration !== null) {
            const filled = fillGap(gap.start_at, gap.end_at, gap.duration, [...sortedRemainingData], usedIds); 
            result.push(filled);
            continue;
        }
        result.push(gap);
    }

    return result.flat();
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



module.exports = fillGaps;
