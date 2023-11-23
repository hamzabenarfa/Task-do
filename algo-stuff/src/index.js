const { format, addMinutes, setHours, setMinutes, isBefore, isAfter } = require('date-fns');
const scheduleItems = require('./data.js');

const startTimeConst = 10;
const endTimeConst = 16;

// Adjust start_at property to fit into the algorithm
const adjustedScheduleItems = scheduleItems.map((item) => {
  if (item.start_at) {
    const [hours, minutes] = item.start_at.split(':');
    const adjustedStartTime = setHours(setMinutes(new Date(), minutes), hours);
    return { ...item, start_at: adjustedStartTime };
  }
  return item;
});

// Separate tasks with start times from other tasks
const tasksWithStartTimes = adjustedScheduleItems.filter((item) => item.start_at);
const otherTasks = adjustedScheduleItems.filter((item) => !item.start_at);

// Sort tasks with start times based on their start time
tasksWithStartTimes.sort((a, b) => isBefore(a.start_at, b.start_at) ? -1 : 1);

// Sort other tasks based on priority
otherTasks.sort((a, b) => a.priority - b.priority);

const fillGaps = (schedule, currentDateTime, nextStartTime, endTime) => {
  const gapStartTime = addMinutes(currentDateTime, 0);
  const gapEndTime = isBefore(nextStartTime, endTime) ? nextStartTime : endTime;

  if (isBefore(gapEndTime, endTime) || isAfter(gapStartTime, endTime)) {
    schedule.push({
      id: 'gap',
      task: 'Gap',
      priority: 0,
      scheduledTime: format(gapStartTime, 'HH:mm'),
      endTime: format(gapEndTime, 'HH:mm'),
    });
  }
};

const generateSchedule = (tasksWithStartTimes, otherTasks) => {
  const startTime = setHours(setMinutes(new Date(), 0), startTimeConst);
  const endTime = setHours(setMinutes(new Date(), 0), endTimeConst);
  const schedule = [];
  let currentDateTime = startTime;

  // Schedule tasks with start times at their specified start times
  tasksWithStartTimes.forEach((item, index) => {
    const nextStartTime = index < tasksWithStartTimes.length - 1
      ? tasksWithStartTimes[index + 1].start_at
      : endTime;

    fillGaps(schedule, currentDateTime, item.start_at, nextStartTime);

    const scheduledEndTime = addMinutes(item.start_at, item.duration);

    if (isBefore(scheduledEndTime, endTime) || isAfter(item.start_at, endTime)) {
      schedule.push({
        id: item.id,
        task: item.task,
        priority: item.priority,
        scheduledTime: format(item.start_at, 'HH:mm'),
        endTime: format(scheduledEndTime, 'HH:mm'),
      });

      currentDateTime = scheduledEndTime;
    }
  });

  // Fill the rest of the time with other tasks
  otherTasks.forEach((item, index) => {
    const nextStartTime = index < otherTasks.length - 1
      ? addMinutes(currentDateTime, otherTasks[index + 1].duration)
      : endTime;

    fillGaps(schedule, currentDateTime, addMinutes(currentDateTime, item.duration), nextStartTime);

    const scheduledEndTime = addMinutes(currentDateTime, item.duration);

    if (isBefore(scheduledEndTime, endTime) || isAfter(currentDateTime, endTime)) {
      schedule.push({
        id: item.id,
        task: item.task,
        priority: item.priority,
        scheduledTime: format(currentDateTime, 'HH:mm'),
        endTime: format(scheduledEndTime, 'HH:mm'),
      });

      currentDateTime = scheduledEndTime;
    }
  });

  return schedule;
};

// Generate the schedule
const generatedSchedule = generateSchedule(tasksWithStartTimes, otherTasks);

// Display the generated schedule
console.log(JSON.stringify(generatedSchedule, null, 2));
