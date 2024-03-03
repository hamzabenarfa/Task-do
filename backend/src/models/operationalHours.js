const { parse } = require("date-fns")

class OperationalHours {
    constructor(day) {
        this._startingTime = day.startingTime;
        this._endingTime = day.endingTime;
    }

    get startingTime() {
        return parse(this._startingTime, 'HH:mm', new Date());
    }

    get endingTime() {
        return parse(this._endingTime, 'HH:mm', new Date());
    }

}

module.exports = OperationalHours;