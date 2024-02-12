  const { addMinutes, compareAsc ,parse,isWithinInterval} = require('date-fns');

  function organizeByContext(schedule, tasks,context, startTime, endTime) {
  // Parse start and end times
  const currentDate = new Date();
    const format = 'HH:mm'; // Time format

    // Parse start and end times to be today with specified hours and minutes
    const contextStartTime = parse(startTime, format, currentDate);
    const contextEndTime = parse(endTime, format, currentDate);

    const contextTasks = tasks
      .filter(task => task._context === context)
      .sort((a, b) => a._priority - b._priority || a._duration - b._duration);

    let currentTime = contextStartTime;
    const scheduledTasks = [];

    for (const task of contextTasks) {
      // Check for any appointments that would conflict with the current task
      const conflictingAppointment = schedule.find(slot =>
        slot._isAppointment &&
        isWithinInterval(currentTime, {
          start: new Date(slot._startAt),
          end: new Date(slot._endAt)
        })
      );
      // Adjust currentTime if there's a conflicting appointment
      if (conflictingAppointment) {
        currentTime = conflictingAppointment._endAt
      }

      // Only schedule the task if there's enough time before the contextEndTime
      if (compareAsc(addMinutes(currentTime, task._duration), contextEndTime) <= 0) {
        scheduledTasks.push({ ...task, 
                              _startAt: currentTime.toISOString(), 
                              _endAt: addMinutes(currentTime, task._duration).toISOString()
                            });
        currentTime = addMinutes(currentTime, task._duration);
      } else {
        // Break the loop if no more tasks can fit
        break;
      }
    }

    return {
      context,
      start: contextStartTime.toISOString(),
      end: currentTime.toISOString(),
      scheduledTasks, 
    };
  }

  module.exports = organizeByContext;
