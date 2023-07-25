import express from "express";
const app = express();

enum Context {
  W = "Work",
  H = "Home",
}

interface Task {
  id:number,
  textTask: string;
  priority?: number;
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

const workingHours : number = 8;
const startWorkingHour: number = 9;
const endWorkingHour = 17;
const lunchBreak = 12;
const lunchBreakDuration = 1;

const tasks: Task[] = [];


const timeblocks: Timeblock[] = []


tasks.push({
  id:1,
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
},{id:4,
  textTask: "meeting 1",
  duree: 1,
  start_at: 10,
  context: Context.W,
},
{ id:5,
  textTask: "meeting 2",
  duree: 1,
  start_at: 12,
  context: Context.W,
},
{ id:6,
  textTask: "meeting 3",
  duree: 1,
  start_at: 14,
  context: Context.W,
} ,{id:7,
  textTask: "Task 4",
  priority: 3,
  duree: 1,
  context: Context.W,
},
{id:8,
  textTask: "Task 5",
  priority: 3,
  duree: 1,
  context: Context.W,
},{id:9,
  textTask: "Task 6",
  priority: 3,
  duree: 1,
  context: Context.W,
},);


// console.log("🚀 ~ file: index.ts:70 ~ tasks:", tasks)

console.log("-------------------------");

const notAvalibale :number[] = [];

tasks
.filter((task) => task.start_at !== undefined)
.map((task) => {
  if(
timeblocks.push({
  
  start_at: task.start_at,
  end_at: task.start_at! + task.duree,
  context: task.context,
  tasks: [task.textTask],
})
){
notAvalibale.push(task.id)}

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
        
        start_at:newStartAt,
        end_at: newEndAt,
        context: task.context,
        tasks: [task.textTask],
      });
      freeTime -= task.duree;

      notAvalibale.push(task.id)
    }

  });

  function findElementWithDifferentId(firstArray :number[], secondArray : any[]) {
    // Use the filter method to find the element in the second array that doesn't have a matching id in the first array
    const mismatchedElement = secondArray.filter(element => !firstArray.includes(element.id));
    
    return mismatchedElement[0]; // Return the first mismatched element found (or undefined if no mismatch is found)
  }


  console.log('hii ',findElementWithDifferentId(notAvalibale,tasks))
  const inbetween = findElementWithDifferentId(notAvalibale,tasks)

  for (let i = 0; i < timeblocks.length - 1; i++) {
    if (timeblocks[i + 1].start_at! - timeblocks[i].end_at! > 0 ) {
      const end = timeblocks[i+1].start_at
      const start=timeblocks[i].end_at!;

      const item = {
        start_at: start!,
        end_at: end!,
        context: Context.W,
        tasks: ['inserted ',+i],
      };
      
      timeblocks.splice(i+1, 0, item); 
      i++
     

  }
}
console.log(notAvalibale)



  
  


console.log(timeblocks);

app.listen(3000, () => {
  
});
