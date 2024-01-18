const { addMinutes, format, setHours, setMinutes, isBefore, differenceInMinutes } = require("date-fns");

function getGaps(sortedMeetings, sortedRemainingData, startingTime, endingTime) {
    const schedule = [];
    let currentTime = setHours(setMinutes(new Date(), 0), startingTime);

    for (const meeting of sortedMeetings) {
        const meetingStart = setHours(setMinutes(new Date(), meeting.start_at.split(":")[1]), meeting.start_at.split(":")[0]);
        const meetingEnd = addMinutes(meetingStart, meeting.duration);
        
        if (isBefore(currentTime, meetingStart)) {
          const gapDuration = differenceInMinutes(meetingStart, currentTime);
          
          const gapEvent = createScheduleEvent('before', 'Gap', currentTime, meetingStart, gapDuration)
          
          schedule.push(gapEvent);
          currentTime = meetingStart;
        }
        // Add the meeting with start_at and end_at
        const meetingEvent = {
        ...meeting,
        start_at: format(meetingStart, 'HH:mm'),
        end_at: format(meetingEnd, 'HH:mm'),
        duration: null
        };
        schedule.push(meetingEvent);

        currentTime = meetingEnd;
        lastMeeting = meeting;
    }

  //Add any remaining time after the last meeting
  const lastMeetingEnd = setHours(setMinutes(new Date(), 0), endingTime);
  if (isBefore(currentTime, lastMeetingEnd)) {
    const remainingDuration = differenceInMinutes(lastMeetingEnd, currentTime);
    const remainingEvent =createScheduleEvent('after', 'Gap', currentTime, lastMeetingEnd, remainingDuration);
    schedule.push(remainingEvent);
  }

  return schedule;
}

function createScheduleEvent(id, task, startAt, endAt, duration) {
    return {
      id: `gap-${id}`,
      task: task,
      start_at: format(startAt, 'HH:mm'),
      end_at: format(endAt, 'HH:mm'),
      duration: duration ,
    };
  }

module.exports = getGaps;


