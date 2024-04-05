
import MenuTrigger from "../../_components/task-menu-trigger";
import Modify from "./modify-task";
import Add from "./add-task";
import { Task } from "@/types/task";

export const TaskCard = ({ id, time, timeDisplay,context ,title, appointment, duration, priority } :Task) => {

  return (
    <div className="flex justify-between bg-white p-4 rounded-lg shadow my-4 " >
      <div className={`flex flex-col w-full items-start justify-between  `}>
        {id &&
          <Modify 
            id={id}
            title={title}
            data = {{context : context, priority : priority , duration : duration }}
            appointment={appointment}
          />
        }
        {!id &&
          <Add 
            title={title}
            time={time}

          />}
        <div className="flex flex-col items-start w-full ">
          <p className="text-sm text-gray-700 ">Duration : {duration} minutes</p>
          <div className="flex justify-between w-full">
            <span className="text-sm text-gray-500 ">{timeDisplay}</span>
            {appointment && <span className="text-xs font-semibold bg-orange-200 px-1 rounded-xl">Appointment</span>}
          </div>

        </div>
      </div>
      {
        id && <MenuTrigger id={id} />
      }

    </div>
  );
};
