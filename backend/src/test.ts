import {convertToMinutes , convertToTime} from './helpers';

interface Task {
    id: number;
    category: string;
    priority: number;
    duree: number;
    start_at?: string;
    end_at?: string;
    context: 'home' | 'work'; 
  }
 
 
  // Main logic
  const tasks = [
    {id: 1, category: 'work', priority: 1, duree: 30},
    {id: 2, category: 'home', priority: 2, duree: 60},
     {id: 2, category: 'home', priority: 2, duree: 60,start_at: "09:00" } 
  ];
  
  const START_TIME = convertToMinutes('08:00');
  const END_TIME = convertToMinutes('17:00');
  
  let bookedTimes: number[][] = [];
  let output: Task[] = [];
  let nextDay: Task[] = [];
  
  // First pass - book fixed time tasks
  for (let task of tasks) {
    if (task.start_at) {
      const startMinutes = convertToMinutes(task.start_at);
      const endMinutes = startMinutes + task.duree;
      const endTime = convertToTime(endMinutes);
      
      bookedTimes.push([startMinutes, endMinutes]);
      task.end_at = endTime;
      output.push(task);
    }

  }
  
  // Filter out booked tasks
  tasks = tasks.filter(t => !t.start_at);
  
  // Sort booked times
  bookedTimes.sort((a, b) => a[0] - b[0]); 
  
  // Find available times
  let available: [number, number][] = [[START_TIME, bookedTimes[0][0]]];
  for (let i = 1; i < bookedTimes.length; i++) {
    available.push([bookedTimes[i-1][1], bookedTimes[i][0]]); 
  }
  if (bookedTimes[bookedTimes.length-1][1] < END_TIME) {
    available.push([bookedTimes[bookedTimes.length-1][1], END_TIME]);
  }
  
  // Schedule tasks in priority order 
  tasks.sort((a, b) => b.priority - a.priority);
  
  for (let task of tasks) {
    for (let time of available) {
      const duration = time[1] - time[0];
      if (duration >= task.duree) {
        task.start_at = convertToTime(time[0]);
        task.end_at = convertToTime(time[0] + task.duree);
        output.push(task);
        time[0] += task.duree;
        break;
      }
    }
    if (!task.start_at) {
      nextDay.push(task);
    }
  }
  
  // Sort final output
  output.sort((a, b) => convertToMinutes(a.start_at) - convertToMinutes(b.start_at));
  
  console.log(output);
  console.log(nextDay);