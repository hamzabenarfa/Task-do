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
 console.log("🚀 ~ scheduler:", scheduler.schedule)

//const res = fillTimeSlots(scheduler.schedule, sortedTasks);



/**
 * we got a problem : does'nt start overflow after the appointment
 * =>>> it need to push the tasks to overflow array after finding an appointment
 * 
 */
const result= organizeByContext(scheduler.schedule, sortedTasks, "job", "8:00", "10:00")
console.log("🚀 ~ result:", result)

result.map((res) => {
    console.log(res.scheduledTasks)
})