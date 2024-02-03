const { isBefore } = require("date-fns");

const TimeSlot = require("./timeSlot");

class Scheduler {
    constructor(sortedApointments, operationalHours) {
        this._schedule = [];
        this._operationalHours = operationalHours;
        this._sortedApointments = sortedApointments;
        this._currentTime = operationalHours.startingTime;
    }
    
    get schedule() {
        return this._schedule;
    }

    getTimeSlots() {
        this._sortedApointments.map((appointment, index) => {
          const appointmentStart = appointment.startAtAsDate;
      
          if (this.slotBefore(appointmentStart)) {
            this.createTimeSlot(appointmentStart)
            this.moveToNextTimeSlot(appointmentStart);
          }
      
          this.createTimeSlot(appointment.endAtAsDate, appointment )
          this.moveToNextTimeSlot(appointment.endAtAsDate);
      
          if (this.lastAppointment(index)) {
            this.createTimeSlot(this._operationalHours.endingTime)
          }
        });

        return this._schedule
    }

    slotBefore(appointmentStart) {
        return isBefore(this._currentTime, appointmentStart)
    }

    createTimeSlot(endAt, task = null) {
        const timeSlot = new TimeSlot(this._currentTime, endAt)
        if(task){ 
            timeSlot.scheduleItem(task)
            timeSlot.isAppointment = true
        }
        this._schedule.push(timeSlot);
    }

    moveToNextTimeSlot(nextTime) {
      this._currentTime = nextTime
    }

    lastAppointment(index) {
        return index === this._sortedApointments.length - 1
    }
}

module.exports = Scheduler;

