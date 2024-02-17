const { addMinutes, parse } = require('date-fns');

class Task {
    constructor(task) {
        this._id = task.id;
        this._task = task.task;
        this._priority = task.priority;
        this._duration = task.duration;
        this._context = task.context;
        this._startAt = null;
    }

    get startAt() {
        return this._startAt;
    }

    get startAtAsDate() {
        
        this.startAt ? parse(this.startAt, 'HH:mm', new Date()) : null;
    }

    get endAt() {
        const hours = this.endAtAsDate.getHours();
        const minutes = this.endAtAsDate.getMinutes();
        return `${hours}:${minutes}`;
    }

    get endAtAsDate() {
        if (this.startAt) {
            return addMinutes(this.startAtAsDate, this._duration);
        }
        return new Date(this.endAt);
    }

    set startAt(time) {
        this._startAt = time;
    }
}

module.exports = Task;