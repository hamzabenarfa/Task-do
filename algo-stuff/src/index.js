const { format, addMinutes, setHours, setMinutes, isBefore, isAfter } = require('date-fns');
const scheduleItems = require('./data.js');

const startTimeConst = 8;
const endTimeConst = 17;

const generateSchedule = (scheduleItems) => {
  const startTime = setHours(setMinutes(new Date(), 0), startTimeConst); 
  
  const endTime = setHours(setMinutes(new Date(), 0), endTimeConst);

  const schedule = [];

  let currentDateTime = startTime;
  
  //sort sleon priority
 scheduleItems.sort((a, b) => a.priority - b.priority);

  scheduleItems.forEach((item) => {
    const scheduledEndTime = addMinutes(currentDateTime, item.duration);

    // Ensure the scheduled time doesn't exceed the end time
    if (isBefore(scheduledEndTime, endTime) || isAfter(currentDateTime, endTime)) {
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



// Generate the schedule
const generatedSchedule = generateSchedule(scheduleItems);

// Display the generated schedule
console.log(JSON.stringify(generatedSchedule, null, 2));
