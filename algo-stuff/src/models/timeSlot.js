class TimeSlot {
    constructor(start_at, end_at) {
        this._startAt = start_at;
        this._endAt = end_at;
        this._scheduledItems = [];
        this._isAppointment = false;
    }

    get startAt() {
        return this._start_at;
    }

    get startAtAsDate() {
        return parse(this.startAt, 'HH:mm', new Date());
    }

    get endAt() {
        return this._endAt;
    }

    get endAtAsDate() {
        return parse(this.startAt, 'HH:mm', new Date())
    }

    get scheduledItems() {
        return this._scheduledItems;
    }
    
    get duration(){
        return this.endAt - this.startAt;
    }

    set startAt(startAt) {
        this._startAt = startAt;
    }

    set isAppointment(_){
        this._isAppointment = true
    }

    set endAt(endAt) {
        this._endAt = endAt;
    }

    scheduleItem(item) {
        this._scheduledItems.push(item);
    }

    isAppointments(){
        return this._isAppointment
    }
    
}

module.exports = TimeSlot;
