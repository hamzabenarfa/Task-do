const fs = require('fs');
const { convertToMinutes,contextValue } = require('./helpers.js'); 
const {scheduleTasks} = require('./s.js');

let rawdata = fs.readFileSync('src/data.json');
let tasks = JSON.parse(rawdata);

let START_WORK_TASKS = "08:00";
let END_WORK_TASKS = "17:00";
let START_HOME_TASKS = "18:00";
let END_HOME_TASKS = "22:00";
let TASKS = tasks;
let OUTPUT = [];
let NEXT_DAY_TASKS = [];




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
  scheduleTasks(workTasks, START_WORK_TASKS, END_WORK_TASKS, OUTPUT, NEXT_DAY_TASKS);
  scheduleTasks(homeTasks, START_HOME_TASKS, END_HOME_TASKS, OUTPUT, NEXT_DAY_TASKS);

  // Sort output by context, start time, and priority
  OUTPUT.sort((task1, task2) => {
    if (contextValue(task1.context) !== contextValue(task2.context)) {
      return contextValue(task1.context) - contextValue(task2.context);
    } else if (convertToMinutes(task1.start_at) !== convertToMinutes(task2.start_at)) {
      return convertToMinutes(task1.start_at) - convertToMinutes(task2.start_at);
    } else {
      return task2.priority - task1.priority;
    }
  });

  console.log(OUTPUT);
  //console.log(NEXT_DAY_TASKS);
}
solve();