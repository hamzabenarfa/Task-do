class Task {
    constructor(id, task, start_at, duration, context, priority = null) {
        this.id = id;
        this.task = task;
        this.start_at = start_at;  // 'HH:mm' format or null if not a meeting
        this.duration = duration;
        this.context = context;
        this.priority = priority;  // null for meetings
    }
}
