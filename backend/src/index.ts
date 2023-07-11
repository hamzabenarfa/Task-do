import express from "express";
const app = express();

enum Context {
  W = "Work",
  H = "Home",
}

interface Task {
  textTask: string;
  priority: number;
  duree: number;
  start_at?: number | null;
  context: Context;
}

interface Timeblock {
  start_at?: number | null;
  end_at?: number;
  context?: Context;
  tasks?: any[];
}

const tasks: Task[] = [];
const timeblocks: Timeblock[] = [];

const workingHours = 8;
const startWorkingHour: number = 8;
const endWorkingHour = 17;
const lunchBreak = 12;
const lunchBreakDuration = 1;

tasks.push({
  textTask: "Task 1",
  priority: 1,
  duree: 1,
  start_at: 10,
  context: Context.W,
}, {
  textTask: "Task 2",
  priority: 1,
  duree: 1,
  context: Context.W,
}, {
  textTask: "Task 3",
  priority: 1,
  duree: 1,
  context: Context.W,
}, {
  textTask: "Task 4",
  priority: 3,
  duree: 1,
  start_at: 11,
  context: Context.W,
},
  {
    textTask: "Task 5",
    priority: 4,
    duree: 1,
    start_at: 10,
    context: Context.W,
  },
  {
    textTask: "Task 6",
    priority: 4,
    duree: 1,
    context: Context.W,
  });


function filterWork() {
  let previousTaskEndAt = startWorkingHour;

  tasks
    .filter((task) => task.priority !== undefined && task.context === Context.W && task.start_at !== null && task.start_at !== undefined)
    .sort((a, b) => (a.start_at || 0) - (b.start_at || 0))
    .forEach((task) => {
      const startAt = Math.max(previousTaskEndAt, task.start_at || 0);

      if (task.start_at !== null && task.start_at !== undefined && task.start_at >= previousTaskEndAt) {
        timeblocks.push({
          start_at: previousTaskEndAt,
          end_at: previousTaskEndAt + task.duree,
          context: Context.W,
          tasks: [task.textTask, task.priority, task.duree, task.context],
        });
        previousTaskEndAt = previousTaskEndAt + task.duree;
      } else {
        const lastTimeblock = timeblocks[timeblocks.length - 1];
        lastTimeblock.end_at = (lastTimeblock.end_at || 0) + task.duree;
        (lastTimeblock.tasks || []).push([task.textTask, task.priority, task.duree, task.context]);
        previousTaskEndAt = lastTimeblock.end_at;
      }
    });
}






function filterHome() {

  tasks
    .filter((task) => task.start_at !== undefined && task.context === Context.H)
    .sort((a, b) => (a.start_at || 0) - (b.start_at || 0))
    .forEach((task) => {

      const previousTaskEndAt = timeblocks[timeblocks.length - 1]?.end_at || 0;
      const startAt = Math.max(previousTaskEndAt, task.start_at!);

      timeblocks.push({
        start_at: startAt,
        end_at: startAt + task.duree,
        context: task.context,
        tasks: [task.textTask, task.priority, task.duree, task.context],
      });


    });

  tasks
    .filter((task) => task.priority !== undefined && task.start_at === undefined && task.context === Context.H)
    .sort((a, b) => (a.priority || 0) - (b.priority || 0))
    .forEach((task) => {
      const previousTaskEndAt = timeblocks[timeblocks.length - 1]?.end_at || 0;

      timeblocks.push({
        start_at: previousTaskEndAt,
        end_at: previousTaskEndAt + task.duree,
        context: task.context,
        tasks: [task.textTask, task.priority, task.duree, task.context],
      });
    });

}

filterWork()
//filterHome()




console.log(timeblocks);

app.listen(3000, () => {
  console.log("-------------------------");
});
