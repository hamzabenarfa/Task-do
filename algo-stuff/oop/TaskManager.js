const { setHours, setMinutes, isBefore, isAfter } = require("date-fns");

export class TaskManager {
    constructor() {
        this.tasks = [];
    }

    addTask(task) {
        this.tasks.push(task);
    }

    getSortedTasks() {
        const meetings = this.tasks.filter(task => task.start_at !== undefined);
        const sortedMeetings = meetings.sort((a, b) => this.compareByStartTime(a, b));

        const remainingTasks = this.tasks.filter(task => task.start_at === undefined);
        const sortedRemainingTasks = remainingTasks.sort((a, b) => this.compareByPriorityAndDuration(a, b));

        return {
            sortedMeetings,
            sortedRemainingTasks
        };
    }

    compareByStartTime(a, b) {
        const aTime = this.createDateAtTime(a.start_at);
        const bTime = this.createDateAtTime(b.start_at);

        if (isBefore(aTime, bTime)) return -1;
        if (isAfter(aTime, bTime)) return 1;
        return 0;
    }

    compareByPriorityAndDuration(a, b) {
        // First, sort by priority (lower priority number comes first)
        if (a.priority !== b.priority) {
            return a.priority - b.priority;
        }
        
        // If priorities are equal, then sort by duration (shorter duration comes first)
        return a.duration - b.duration;
    }

    createDateAtTime(time) {
        const [hours, minutes] = time.split(':').map(Number);
        return setHours(setMinutes(new Date(), minutes), hours);
    }
}
