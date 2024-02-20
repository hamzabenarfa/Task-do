"use client"
import { useEffect, useState } from "react";
import { TaskCard } from "./task-card";
import scheduleService from "@/service/schedule.service";

const TimeBar = () => {
  const [schedule, setSchedule] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = localStorage.getItem("accessToken");
  useEffect(() => {
    const fetchSchedule = async () => {
      const { data, error, isLoading } = await scheduleService.fetchSchedule();
      setIsLoading(isLoading);
      if (error) {
        setError(error);
      } else {
        setSchedule(data);
      }
    };

    fetchSchedule();
  }, []);

  if (isLoading) return <div>Loading...</div>;

  if (error) return <div>Error fetching data</div>;

  const timeSlots = [
    '09 am', '10 am', '11 am', '12 pm', '01 pm', '02 pm', '03 pm', '04 pm'
  ];

  const heightPerHour = 70; // Adjust as needed

//   const calculateHeight = (startTime, endTime) => {
//     // Convert times to 24-hour format for simplicity in calculation
//     const convertTo24Hour = time => {
//       let [hour, period] = time.split(' ');
//       if (period === 'pm' && hour !== '12') hour = parseInt(hour) + 12;
//       if (period === 'am' && hour === '12') hour = '00'; // Handle midnight
//       return parseInt(hour);
//     };

//     let start = convertTo24Hour(startTime);
//     let end = convertTo24Hour(endTime);

//     // Calculate the duration in hours
//     let duration = end - start;

//     // Calculate and return the height
//     return `${duration * heightPerHour}px`;
//   };style={{ height: calculateHeight(item.startAt, item.endAt) }}

  return (
    <div className="flex flex-row">
      {/* <div className="flex flex-col w-24 ">
        {timeSlots.map((time, index) => (
          <div key={index} className="my-6 ml-3">
            <p className="text-sm  text-gray-600">{time}</p>
          </div>
        ))}
      </div> */}
      <div className="p-4 space-y-4 flex-1">
        {schedule.map((item, index) => (
          <TaskCard
            id={item.id}
            key={index}
            time={`${item.startAt} - ${item.endAt}`}
            title={item.task}
            appointment={item.isAppointment}
            
          />
        ))}
      </div>
    </div>
  );
};

export default TimeBar;
