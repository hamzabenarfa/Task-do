
const OperationalHours = require('../models/OperationalHours');
const { dataSegregator, sortedData } = require('../service/dataProcessor');
const Scheduler = require('../models/scheduler');
const fillTimeSlots = require('../service/fillTimeSlots');

createSchedule = async (today, myTasksData) => {
    try {
        const myDay = new OperationalHours(
           { startingTime:today.startingTime, endingTime:today.endingTime}
        )
        
        const [appointments, tasks] = dataSegregator(myTasksData);    
 
        const [sortedApointments, sortedTasks] = sortedData(appointments, tasks);

        const scheduler = new Scheduler(sortedApointments, myDay);
        scheduler.getTimeSlots();

        const result = fillTimeSlots(scheduler.schedule, sortedTasks);
        return result;
    }
    catch (error) {
        console.error('Error creating schedule:', error);
        throw error;
    }

}

module.exports = createSchedule;  