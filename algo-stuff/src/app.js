const data = require('./data/data.js');
const { sortedData, dataSegregator } = require('./controller/dataProcessor.js');
const Scheduler = require('./models/scheduler.js');
const fillTimeSlots = require('./controller/fillTimeSlots.js');
const OperationalHours = require('./models/OperationalHours.js');
const organizeByContext = require('./controller/organizeByContext.js');

//Get operational hours
const MyDay = new OperationalHours({
   
    startingTime: '8:00',
    endingTime: '17:00',
})
//get tasks 
const [appointments, tasks] = dataSegregator(data);
const [sortedApointments, sortedTasks]  = sortedData(appointments, tasks);

const scheduler = new Scheduler(sortedApointments, MyDay);
scheduler.getTimeSlots();
// console.log("🚀 ~ scheduler:", scheduler.schedule)


const res = fillTimeSlots(scheduler.schedule, sortedTasks);



/**
 * sorting :
 * what if we have a 60 min duration available in the timeslot to fill
 * but we have 2 tasks with 20 min duration priority 1 
 *             1 task with 75 min duration priority 1
 *             1 task with 20 min duration priority 2
 * by logic it should fill the 60 min duration with the :
 * 2 tasks with 20 min duration priority 1
 * and then the 20 min duration priority 2
 * but the function is to dumb to do that
 * 
 * so what should we do ?
 * 
 * it loop through the tasks get the tasks from priority 1 
 * then calculate remaining duration available in the timeslot
 * 
 * then compare the remaining duration with the next task duration
 * if the remaining duration is greater than the next task duration
 * then it should add the next task to the timeslot
 * 
 * 
 * 
 * 
 */

/**
 * it should always search for available time slot
 * 
 * let say the context "job" start time is 8:00 and end time is 9:00
 * so the "job" duration is 60mins but the total of "job" tasks is 40mins
 * then what should it do ?
 * should it change the "job" end time to 8:40 ?
 * or what if there is no 'job' task in the schedule ?
 * what should it do ?
 * 
 * 
 * let say the context "job" start time is 8:00 and end time is 11:00
 * but there is a appointment from 9:00 to 9:20
 * what should it do ?
 * should it do the job from 8:00 to 9:00 and then from 9:20 to 11:00 ?
 * or should it return choose another time ?
 * 
 */

console.log(organizeByContext(scheduler.schedule, sortedTasks, "job", "8:00", "11:00"))
