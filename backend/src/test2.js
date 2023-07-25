const fs = require('fs');

let rawdata = fs.readFileSync('src/data.json');
let tasks = JSON.parse(rawdata);

let START_TASKS = "08:00";
let END_TASKS = "17:00";
let START_HOME_TASKS = "17:00";
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


function solve() {
    let booked_time = [["12:00", "13:00"]];
  
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
    scheduleTasks(workTasks, booked_time);
    scheduleTasks(homeTasks, booked_time);
    
    
    console.log(OUTPUT);
    //console.log(NEXT_DAY_TASKS);
  }
  
  function scheduleTasks(tasks, booked_time) {
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
  
    let available_time = [];
    let next_starting_available_time = START_TASKS;
  
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
    if (next_starting_available_time < END_TASKS) {
      available_time.push([next_starting_available_time, END_TASKS]);
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
  
  solve();