const { addMinutes, format } = require('date-fns');

export class GapFiller {
    constructor() {
        // You can initialize any needed properties here
    }

    fillGaps(gaps, sortedRemainingTasks) {
        const result = [];
        const usedIds = new Set();  // Create a set to keep track of used task IDs

        for (const gap of gaps) {
            if (gap.duration !== null) {
                const filled = this.fillSingleGap(gap, sortedRemainingTasks, usedIds); 
                result.push(...filled);  // Spread to flatten the array of arrays
            } else {
                result.push(gap);
            }
        }

        return result;
    }

    fillSingleGap(gap, remainingTasks, usedIds) {
        const res = [];
        const addedIds = new Set();
        let currentTime = this.parseTime(gap.start_at);
        let duration = gap.duration;

        while (remainingTasks.length > 0 && duration > 0) {
            const task = remainingTasks[0];

            if (duration - task.duration >= 0 && !addedIds.has(task.id) && !usedIds.has(task.id)) {
                const taskStart = format(currentTime, 'HH:mm');
                currentTime = addMinutes(currentTime, task.duration);
                const taskEnd = format(currentTime, 'HH:mm');

                const taskWithTime = {
                    ...task,
                    start_at: taskStart,
                    end_at: taskEnd
                };

                duration -= task.duration;
                res.push(taskWithTime);
                addedIds.add(task.id);
                usedIds.add(task.id);
            }
            remainingTasks.shift();
        }

        return res;
    }

    parseTime(time) {
        const [hours, minutes] = time.split(':').map(Number);
        const date = new Date();
        date.setHours(hours, minutes, 0, 0);
        return date;
    }
}
