"use client"


import { useEffect, useState } from "react";
import { TaskCard } from "./task-card";
import scheduleService from "@/service/schedule.service";
import operationalHours from "@/service/operational-hours.service";

const TimeBar = () => {
  const [schedule, setSchedule] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [timeSlots, setTimeSlots] = useState([]);

  useEffect(() => {
    const fetchScheduleAndGenerateSlots = async () => {
      try {
        const { data } = await scheduleService.fetchSchedule();
        setSchedule(data);
        setIsLoading(false);

        const sortedTimeSlots = data.sort((a, b) => a.startAt.localeCompare(b.startAt));
  
        const timeSlotsWithGaps = [];
  
        sortedTimeSlots.forEach((slot, index) => {
          // Directly push the actual task
          timeSlotsWithGaps.push({ ...slot, isGap: false });
  
          if (index < sortedTimeSlots.length - 1) {
            const currentEnd = slot.endAt;
            const nextStart = sortedTimeSlots[index + 1].startAt;
  
            if (currentEnd < nextStart) {
              // Push a gap marked as such
              timeSlotsWithGaps.push({ startAt: currentEnd, endAt: nextStart, isGap: true });
            }
          }
        });
  
        setTimeSlots(timeSlotsWithGaps);
      } catch (error) {
        console.error("Error fetching schedule:", error);
        setError(error);
        setIsLoading(false);
      }
    };
  
    fetchScheduleAndGenerateSlots();
  }, []);

  const heightPerHour = 600; // Adjust as needed
  const calculateHeight = (startTime, endTime) => {
    const [startHour, startMinute] = startTime.split(':').map(Number);
    const [endHour, endMinute] = endTime.split(':').map(Number);
  
    // Calculate the start and end times in minutes
    const startTimeInMinutes = startHour * 60 + startMinute;
    const endTimeInMinutes = endHour * 60 + endMinute;
  
    // Calculate the duration in minutes
    const durationInMinutes = endTimeInMinutes - startTimeInMinutes;
  
    // Calculate the height per minute
    const heightPerMinute = heightPerHour / 60;
  
    // Return the height for the duration
    return `${durationInMinutes * heightPerMinute}px`;
  };
  

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching data</div>;

  return (
    <div className="flex flex-row">
      <div className="p-4 space-y-4 flex-1">
        {timeSlots.map((item, index) => (
          item.isGap ? (
            // Render a blank task card for a gap
            <TaskCard
              key={`gap-${index}`}
              timeDisplay={`${item.startAt} - ${item.endAt}`}
              time={[item.startAt ,item.endAt]}

              title="Add task"
              appointment={false}
              style={{ height: calculateHeight(item.startAt, item.endAt) }}
              />
          ) : (
            // Render the actual task card
            <TaskCard
              id={item.id}
              key={item.id}
              timeDisplay={`${item.startAt} - ${item.endAt}`}
              time={[item.startAt ,item.endAt]}

              title={item.task}
              appointment={item.isAppointment}
              style={{ height: calculateHeight(item.startAt, item.endAt) }}
              />
          )
        ))}
      </div>
    </div>
  );
};

export default TimeBar;
