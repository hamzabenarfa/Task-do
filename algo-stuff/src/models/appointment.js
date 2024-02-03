const { addMinutes, parse } = require('date-fns');

class Appointment {
    constructor(appointment) {
        this._id = appointment.id;
        this._task = appointment.task;
        this._startAt = appointment.start_at;
        this._duration = appointment.duration;
    }

    get startAt() {
        return this._startAt;
    }

    get startAtAsDate() {
        return parse(this.startAt, 'HH:mm', new Date());
    }

    get endAtAsDate() {
        return addMinutes(this.startAtAsDate, this._duration);
    }

    get endAt() {
        const hours = this.endAtAsDate.getHours();
        const minutes = this.endAtAsDate.getMinutes();
        return `${hours}:${minutes}`;
    }

    set startAt(time) {
        this._startAt = time;
    }
}


module.exports = Appointment;

