const fs = require('fs');

let rawdata = fs.readFileSync('src/data.json');
let tasks = JSON.parse(rawdata);

let START_WORK_TASKS = "08:00";
let END_WORK_TASKS = "17:00";
let START_HOME_TASKS = "18:00";
let END_HOME_TASKS = "22:00";
let TASKS = tasks;
let OUTPUT = [];
let NEXT_DAY_TASKS = [];

function convert_to_minutes(time) {
  let [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
}

function convert_to_time_format(duree) {
  let hours = String(Math.floor(duree / 60));
  let minutes = String(duree % 60);
  if (Number(hours) < 10) {
    hours = "0" + hours;
  }
  if (Number(minutes) < 10) {
    minutes = "0" + minutes;
  }
  return hours + ":" + minutes;
}

function contextValue(context) {
  return context === "Work" ? 0 : 1;
}

function scheduleTasks(tasks, start_time, end_time) {
  let booked_time = [];
  let available_time = [[start_time, end_time]];

  for (let task of tasks) {
    if ("start_at" in task) {
      let start_time = task["start_at"];
      let end_time = convert_to_time_format(
        convert_to_minutes(start_time) + task["duree"]
      );
      booked_time.push([start_time, end_time]);
      task["end_at"] = end_time;
      OUTPUT.push(task);
    }
  }

  tasks = tasks.filter((task) => !("start_at" in task));

  booked_time.sort(
    (time1, time2) =>
      convert_to_minutes(time1[0]) - convert_to_minutes(time2[0])
  );

  let next_starting_available_time = start_time;

  for (let i = 0; i < booked_time.length; i++) {
    if (
      convert_to_minutes(next_starting_available_time) < convert_to_minutes(booked_time[i][0])
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

  for (let task of tasks) {
    for (let i = 0; i < available_time.length; i++) {
      let time = available_time[i];
      if (
        convert_to_minutes(time[1]) - convert_to_minutes(time[0]) >= task["duree"]
      ) {
        task["start_at"] = time[0];
        task["end_at"] = convert_to_time_format(
          convert_to_minutes(task["start_at"]) + task["duree"]
        );
        OUTPUT.push(task);
        available_time[i] = [task["end_at"], time[1]];  // Replace the old time slot with the updated one
        break;
      }
    }
    if (!task["start_at"]) {
      NEXT_DAY_TASKS.push(task);
    }
  }
}

function solve() {
  let workTasks = TASKS.filter(task => task.context === "Work");
  let homeTasks = TASKS.filter(task => task.context === "Home");

  // Sort tasks by priority, then id
  workTasks.sort((task1, task2) => {
    if (task1.priority !== task2.priority) {
      return task2.priority - task1.priority;
    } else {
      return task1.id - task2.id;
    }
  });

  homeTasks.sort((task1, task2) => {
    if (task1.priority !== task2.priority) {
      return task2.priority - task1.priority;
    } else {
      return task1.id - task2.id;
    }
  });

  // Schedule work tasks first, then home tasks
  scheduleTasks(workTasks, START_WORK_TASKS, END_WORK_TASKS);
  scheduleTasks(homeTasks, START_HOME_TASKS, END_HOME_TASKS);

  // Sort output by context, start time, and priority
  OUTPUT.sort((task1, task2) => {
    if (contextValue(task1.context) !== contextValue(task2.context)) {
      return contextValue(task1.context) - contextValue(task2.context);
    } else if (convert_to_minutes(task1.start_at) !== convert_to_minutes(task2.start_at)) {
      return convert_to_minutes(task1.start_at) - convert_to_minutes(task2.start_at);
    } else {
      return task2.priority - task1.priority;
    }
  });

  console.log(OUTPUT);
  //console.log(NEXT_DAY_TASKS);
}
solve();