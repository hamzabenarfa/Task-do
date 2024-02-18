import { TaskCard } from "./task-card";

const TimeBar = () => {
    // Array of time slots for the day
    const timeSlots = [
        '09 am', '10 am', '11 am', '12 pm', '01 pm', '02 pm', '03 pm', '04 pm'
    ];

    // Height per hour (assuming each time slot represents one hour)
    const heightPerHour = 70; // this is an arbitrary number, adjust as needed

    const calculateHeight = (startTime, endTime) => {
        const [startHr, startPeriod] = startTime.split(' ');
        const [endHr, endPeriod] = endTime.split(' ');

        // Convert times to 24-hour format for simplicity in calculation
        let start = parseInt(startHr) + (startPeriod === 'pm' && startHr !== '12' ? 12 : 0);
        let end = parseInt(endHr) + (endPeriod === 'pm' && endHr !== '12' ? 12 : 0);

        // Calculate the duration in hours
        let duration = end - start;
        
        // Calculate and return the height
        return `${duration * heightPerHour}px`;
    };

    return (
        <div className="flex flex-row">

            <div className="flex flex-col w-24 ">
                {timeSlots.map((time, index) => (
                    <div key={index} className="my-6 ml-3">
                        <p className="text-sm  text-gray-600">{time}</p>
                    </div>
                ))}
            </div>
            <div className="p-4 space-y-4 flex-1">
                    <TaskCard
                        time="09:00 am - 11:00 am"
                        title="Optimize server response time."
                        style={{ height: calculateHeight('09 am', '11:00 am') }}

                    />
              
                    <TaskCard
                        time="09:00 am - 11:00 am"
                        title="Scrum meeting."
                        style={{ height: calculateHeight('11 am', '14 am') }}
                    />
            </div>
        </div>
    );
};

export default TimeBar;
