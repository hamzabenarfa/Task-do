const formatTime = require("../helper/formatTime.js");
const Appointment = require("../models/appointment.js");
const Task = require("../models/task.js");

function compareByStartTime(current, next) {
  const currentTime = current.start_at;
  const nextTime = next.start_at;

  return currentTime - nextTime;
}

function byPriorityAndDuration(current, next) {
  return current.priority - next.priority || current.duration - next.duration;
}

function dataSegregator(data) {
  const { appointments, tasks } = data.reduce((acc, item) => {
    if (item.start_at !== undefined) {
      let appointment = new Appointment(item)
      acc.appointments.push(appointment);
    } else {
      let task = new Task(item);
      acc.tasks.push(task);
    }
    return acc;
  }, { appointments: [], tasks: [] });

  return [appointments, tasks];  
}

function sortedData(appointments, tasks) {
  const sortedMeetings = appointments.sort(compareByStartTime);

  const sortedTasks = tasks.sort(byPriorityAndDuration);

  return [sortedMeetings, sortedTasks];
}

module.exports = { sortedData, dataSegregator };
