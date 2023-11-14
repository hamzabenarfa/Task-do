const { convertToMinutes, convertToTime } = require('./helpers.js');

function scheduleTasks(tasks, start_time, end_time, OUTPUT, NEXT_DAY_TASKS) {
  const booked_time = [];
  const available_time = [[start_time, end_time]];
  let next_starting_available_time = start_time;

  tasks
    .filter(task => task.start_at)
    .map(task => ({
      ...task,
      end_at: convertToTime(convertToMinutes(task.start_at) + task.duree),
    }))
    .forEach(task => {
      booked_time.push([task.start_at, task.end_at]);
      OUTPUT.push(task);
    });

  const remaining_tasks = tasks.filter(task => !task.start_at);

  booked_time.sort((time1, time2) => convertToMinutes(time1[0]) - convertToMinutes(time2[0]));

  for (const [start, end] of booked_time) {
    if (convertToMinutes(next_starting_available_time) < convertToMinutes(start)) {
      available_time.push([next_starting_available_time, start]);
    }
    next_starting_available_time = end;
  }

  if (next_starting_available_time < end_time) {
    available_time.push([next_starting_available_time, end_time]);
  }

  for (const task of remaining_tasks) {
    const [start, end] = available_time.find(([start, end]) => convertToMinutes(end) - convertToMinutes(start) >= task.duree) || [];
    if (start) {
      task.start_at = start;
      task.end_at = convertToTime(convertToMinutes(start) + task.duree);
      OUTPUT.push(task);
      available_time.splice(available_time.indexOf([start, end]), 1, [task.end_at, end]);
    } else {
      NEXT_DAY_TASKS.push(task);
    }
  }
}

module.exports = { scheduleTasks };