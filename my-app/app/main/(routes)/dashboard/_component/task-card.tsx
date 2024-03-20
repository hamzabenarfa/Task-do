
import MenuTrigger from "../../_components/task-menu-trigger";
import Modify from "../../_components/modify-task";
import Add from "./add-task-trigger";

export const TaskCard = ({ id, time, timeDisplay, title, style, appointment, duration, }) => {

  //const isHeightLessThan100 = parseInt(style.height, 10) < 100;

 // const flexDirectionClass = isHeightLessThan100 ? "flex-row gap-2" : "";
  return (
    <div className="flex justify-between bg-white p-4 rounded-lg shadow my-4 " style={style}>
      <div className={`flex flex-col w-full items-start justify-between  `}>
        {id &&
          <Modify id={id}
            title={title}
            appointment={appointment}
          />
        }
        {!id &&
          <Add title={title}
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
        id &&
        <MenuTrigger id={id} />
      }

    </div>
  );
};
