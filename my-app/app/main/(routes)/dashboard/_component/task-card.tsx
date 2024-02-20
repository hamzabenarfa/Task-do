'use client'
import { MoreVertical } from "lucide-react";

export const TaskCard = ({ time, title,style,appointment }) => {

    return (
        <div className="flex justify-between bg-white p-4 rounded-lg shadow my-4" style={style}>
        <div className="flex flex-col  justify-between">
          <h2 className="text-lg font-semibold">{title}</h2>
 <div className=" space-x-2">
          <span className="text-sm text-gray-500">{time}</span>
         { appointment && <span className="text-xs font-semibold bg-orange-200 px-1 rounded-xl">Appointment</span>
} </div>


        </div>

        <MoreVertical className="w-6 h-6 cursor-pointer"  />
      
      </div>
    );
  };
  