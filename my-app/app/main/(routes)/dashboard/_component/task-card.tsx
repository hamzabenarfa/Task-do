
import MenuTrigger from "../../_components/menu-trigger";
import Modify from "../../_components/modify-task";

export const TaskCard = ({ id, time, title, style, appointment }) => {
  
  return (
    <div className="flex justify-between bg-white p-4 rounded-lg shadow my-4" style={style}>
      <div className="flex flex-col items-start  justify-between">
        <Modify id={id}
                title={title}
                appointment={appointment}
        />
        <div className=" space-x-2">
          <span className="text-sm text-gray-500">{time}</span>
          {appointment && <span className="text-xs font-semibold bg-orange-200 px-1 rounded-xl">Appointment</span>}
        </div>
      </div>

      <MenuTrigger id={id} />

    </div>
  );
};
