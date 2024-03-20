import React from 'react';
import { format, startOfWeek, addDays } from 'date-fns';

const CalendarNav = () => {
    const today = new Date();
    const startOfCurrentWeek = startOfWeek(today); 
    const weekDays = []; 
    const dates = []; 

    for (let i = 0; i < 7; i++) {
        const currentDate = addDays(startOfCurrentWeek, i);
        weekDays.push(format(currentDate, 'EEE')); 
        dates.push(format(currentDate, 'dd')); 
    }

    return (
        <div className="p-4">
            <div className="flex items-center justify-between text-xs">
                {weekDays.map((day, index) => (
                    <div key={day} className={`text-center cursor-pointer ${dates[index] === format(today, 'dd') ? 'text-red-500 font-semibold' : 'text-gray-600'}`}>
                        <div>{day}</div>
                        <div className={`${dates[index] === format(today, 'dd') ? 'p-2 rounded-full bg-red-100' : ''}`}>{dates[index]}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CalendarNav;
