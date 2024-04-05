"use client"
import { useEffect, useState } from "react";
import { TaskCard } from "./task-card";
import scheduleService from "@/service/schedule.service";
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
  
        const timeSlotsWithGaps  = [];
          
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


  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching data</div>;

  return (
    <div className="flex flex-row">
      <div className="p-4 space-y-4 flex-1">
        {timeSlots.map((item, index) => (
          item.isGap ? (
            <TaskCard
              id={null}
              key={`gap-${index}`}
              timeDisplay={`${item.startAt} - ${item.endAt}`}
              time={[item.startAt, item.endAt]}
              title="Add task"
              appointment={false} 
              style={undefined} 
              duration={undefined}           
              />
          ) : (
            <TaskCard
              id={item.id}
              key={item.id}
              timeDisplay={`${item.startAt} - ${item.endAt}`}
              time={[item.startAt ,item.endAt]}
              duration={item.duration}
              priority={item.priority}
              title={item.task}
              context={item.context}
              appointment={item.isAppointment}
              />
          )
        ))}
      </div>
    </div>
  );
};

export default TimeBar;
