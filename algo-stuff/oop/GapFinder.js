const { setHours, setMinutes, addMinutes, format, isBefore, differenceInMinutes } = require("date-fns");

class GapFinder {
    constructor() {
      
    }

    findGaps(sortedMeetings, workingHours) {
        const schedule = [];
        let currentTime = this.createDateAtTime(workingHours.start);
        
        for (const meeting of sortedMeetings) {
            const meetingStart = this.createDateAtTime(meeting.start_at);
            const meetingEnd = addMinutes(meetingStart, meeting.duration);
            
            if (isBefore(currentTime, meetingStart)) {
                const gapDuration = differenceInMinutes(meetingStart, currentTime);
                const gapEvent = this.createScheduleEvent('Gap', currentTime, meetingStart, gapDuration);
                schedule.push(gapEvent);
                currentTime = meetingStart;
            }

            // Add the meeting as an event
            const meetingEvent = {
                ...meeting,
                start_at: format(meetingStart, 'HH:mm'),
                end_at: format(meetingEnd, 'HH:mm'),
                duration: null  // Duration is null because it's an actual meeting, not a gap
            };
            schedule.push(meetingEvent);

            currentTime = meetingEnd;
        }

        // Check for a gap between the last meeting and the end of the working day
        const workingDayEnd = this.createDateAtTime(workingHours.end);
        if (isBefore(currentTime, workingDayEnd)) {
            const remainingDuration = differenceInMinutes(workingDayEnd, currentTime);
            const remainingEvent = this.createScheduleEvent('Gap', currentTime, workingDayEnd, remainingDuration);
            schedule.push(remainingEvent);
        }

        return schedule;
    }

    createDateAtTime(time) {
        const [hours, minutes] = time.split(':').map(Number);
        return setHours(setMinutes(new Date(), minutes), hours);
    }

    createScheduleEvent(type, startAt, endAt, duration) {
        return {
            type: type,
            start_at: format(startAt, 'HH:mm'),
            end_at: format(endAt, 'HH:mm'),
            duration: duration
        };
    }
}
