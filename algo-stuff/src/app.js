const data = require('./data/data.js');
const { sortedData, dataSegregator } = require('./controller/dataProcessor.js');
const Scheduler = require('./models/scheduler.js');
const fillTimeSlots = require('./controller/fillTimeSlots.js');
const OperationalHours = require('./models/OperationalHours.js');

const organizeByContext = require('./controller/organizeByContext.js');


const MyDay = new OperationalHours({
    startingTime: "8:00",
    endingTime: "17:00",
})

/**
 * input of time of day 
 * route : /time 
 * body :{}
 * 
 */

const [appointments, tasks] = dataSegregator(data);
const [sortedApointments, sortedTasks]  = sortedData(appointments, tasks);

const scheduler = new Scheduler(sortedApointments, MyDay);
scheduler.getTimeSlots();
//console.log("🚀 ~ gaps:", scheduler.schedule)

 const res = fillTimeSlots(scheduler.schedule, sortedTasks);
 console.log("🚀 ~ res:", res)


 
// console.log(organizeByContext(res, "job", "8:00", "9:00"))

// console.log(organizeByContext(res, 'job', "9:00", "13:00"))


