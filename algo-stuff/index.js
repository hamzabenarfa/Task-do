const { format, setHours, setMinutes, addMinutes } = require('date-fns');

// Function to generate a schedule
const generateSchedule = (scheduleItems) => {
  const startTime = setHours(setMinutes(new Date(), 0), 8); // Set the start time to 8 am
  const endTime = setHours(setMinutes(new Date(), 0), 17); // Set the end time to 5 pm

  const criticalTasks = [];
  const normalTasks = [];

  scheduleItems.forEach((item) => {
    if (item.isCritical) {
      criticalTasks.push({
        ...item,
      });
    } else {
      normalTasks.push({
        ...item,
      });
    }
  });

  let currentDateTime = startTime;

  const schedule = [];

  criticalTasks.forEach((item) => {
    const startDateTime = item.startDateTime;
    const endDateTime = item.endDateTime;

    if (startDateTime && endDateTime) {
      schedule.push({
        id: item.id,
        task: item.task,
        priority: item.priority,
        scheduledTime: format(startDateTime, "HH:mm"),
        endTime: format(endDateTime, "HH:mm"),
      });

      if (endDateTime > currentDateTime) {
        currentDateTime = endDateTime;
      }
    }
  });

  normalTasks.sort((a, b) => a.priority - b.priority);

  normalTasks.forEach((item) => {
    const scheduledEndTime = addMinutes(currentDateTime, item.duration || 0);

    if (currentDateTime < endTime) {
      schedule.push({
        id: item.id,
        task: item.task,
        priority: item.priority,
        scheduledTime: format(currentDateTime, "HH:mm"),
        endTime: format(scheduledEndTime, "HH:mm"),
      });

      currentDateTime = scheduledEndTime;
    }
  });

  return schedule;
};

// Example schedule items in JSON format (with critical tasks having startDateTime and endDateTime)
const scheduleItems = [
  { id: 1, task: 'Meeting', priority: 3, isCritical: true, startDateTime: new Date(2023, 10, 1, 9, 0), endDateTime: new Date(2023, 10, 1, 10, 0) },
  { id: 2, task: 'Work on Project', priority: 1, duration: 120 },
  { id: 3, task: 'Lunch', priority: 2, duration: 30 },
  { id: 4, task: 'Another Meeting', priority: 1, isCritical: true, startDateTime: new Date(2023, 10, 1, 10, 30), endDateTime: new Date(2023, 10, 1, 11, 15) },
  // Add more tasks with different durations and critical flags
];

// Generate the schedule
const generatedSchedule = generateSchedule(scheduleItems);

// Display the generated schedule
console.log(JSON.stringify(generatedSchedule, null, 2));
