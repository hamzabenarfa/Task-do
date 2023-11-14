const { convertToMinutes, convertToTime } = require('./helpers.js'); 

function scheduleTasks(tasks, start_time, end_time, OUTPUT, NEXT_DAY_TASKS) {
  const booked_time = [];
  const available_time = [[start_time, end_time]];
  let next_starting_available_time = start_time;

  for (const task of tasks) {
    if ("start_at" in task) {
      const start_time = task["start_at"];
      const end_time = convertToTime(
        convertToMinutes(start_time) + task["duree"]
      );
      booked_time.push([start_time, end_time]);
      task["end_at"] = end_time;
      OUTPUT.push(task);
    }
  }

  tasks = tasks.filter((task) => !("start_at" in task));  

  booked_time.sort(
    (time1, time2) =>
      convertToMinutes(time1[0]) - convertToMinutes(time2[0])
  );

  for (let i = 0; i < booked_time.length; i++) {
    if (
      convertToMinutes(next_starting_available_time) < convertToMinutes(booked_time[i][0])
    ) {
      available_time.push([
        next_starting_available_time,
        booked_time[i][0],
      ]);
    }
    next_starting_available_time = booked_time[i][1];
  }
  if (next_starting_available_time < end_time) {
    available_time.push([next_starting_available_time, end_time]);
  }

  for (const task of tasks) {
    for (let i = 0; i < available_time.length; i++) {
      const time = available_time[i];
      if (
        convertToMinutes(time[1]) - convertToMinutes(time[0]) >= task["duree"]
      ) {
        task["start_at"] = time[0];
        task["end_at"] = convertToTime(
          convertToMinutes(task["start_at"]) + task["duree"]
        );
        OUTPUT.push(task);
        available_time[i] = [task["end_at"], time[1]]; 
        break;
      }
    }
    if (!task["start_at"]) {
      NEXT_DAY_TASKS.push(task);
    }
  }
}

module.exports = { scheduleTasks };