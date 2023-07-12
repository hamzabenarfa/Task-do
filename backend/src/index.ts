import { time } from "console";
import express from "express";
import { freemem } from "os";
const app = express();

enum Context {
  W = "Work",
  H = "Home",
}

interface Task {
  id:number,
  textTask: string;
  priority: number;
  duree: number;
  start_at?: number | null;
  context: Context;
}

interface Timeblock {
  id:number,
  start_at?: number | null;
  end_at?: number;
  context?: Context;
  tasks?: any[];
}
const workingHours = 8;
const startWorkingHour: number = 8;
const endWorkingHour = 17;
const lunchBreak = 12;
const lunchBreakDuration = 1;

const tasks: Task[] = new Array();


const timeblocks: Timeblock[] = [];





tasks.push({id:1,
  textTask: "Task 1",
  priority: 1,
  duree: 1,
  context: Context.W,
}, {id:2,
  textTask: "Task 2",
  priority: 2,
  duree: 1,
  context: Context.W,
}, {id:3,
  textTask: "Task 3",
  priority: 3,
  duree: 1,
  context: Context.W,
}, {id:4,
  textTask: "Task 4",
  priority: 1,
  duree: 1,
  start_at: 10,
  context: Context.W,
},
{id:5,
    textTask: "Task 5",
    priority: 2,
    duree: 1,
    start_at: 12,
    context: Context.W,
});


// console.log("🚀 ~ file: index.ts:70 ~ tasks:", tasks)

console.log("-------------------------");

tasks
.filter((task) => task.start_at !== undefined)
.map((task) => {

timeblocks.push({
  id:task.id,
  start_at: task.start_at,
  end_at: task.start_at! + task.duree,
  context: task.context,
  tasks: [task.textTask],
});

});

let freeTime =timeblocks[0].start_at! - startWorkingHour 

tasks
  .filter((task) => task.duree !== undefined && task.start_at === undefined )
  .sort((a, b) => a.priority! - b.priority!)
  .forEach((task) => {
    if (task.duree! <= freeTime) {
      const newStartAt = timeblocks[0].start_at! - task.duree;
      const newEndAt = newStartAt + task.duree;

      timeblocks.unshift({
        id:task.id,
        start_at:newStartAt,
        end_at: newEndAt,
        context: task.context,
        tasks: [task.textTask],
      });
      freeTime -= task.duree;
    }

  });




  
  









console.log(timeblocks);

app.listen(3000, () => {
  
});
