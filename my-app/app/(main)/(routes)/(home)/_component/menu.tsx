import { Shell,CalendarDays,Check, Calendar } from "lucide-react";

const Menu = () => {
    return ( 
        <div className="flex items-center justify-evenly m-4 border p-2 border-gray-100 shadow-lg rounded-3xl">
            <div className="flex items-center justify-center flex-col text-blue-500 ">
                <Shell size={24} />
                <p className="text-xs fony-bold">My Day</p>
            </div>
            <div className="flex items-center justify-center flex-col text-blue-500 ">
                <CalendarDays size={24} />
                <p className="text-xs fony-bold">Next 7 days</p>
            </div>
            <div className="flex items-center justify-center flex-col text-blue-500 ">
                <Check size={24} />
                <p className="text-xs fony-bold">All Tasks</p>
            </div>
            <div className="flex items-center justify-center flex-col text-blue-500 ">
                <Calendar size={24} />
                <p className="text-xs fony-bold">Calender</p>
            </div>
        </div>
     );
}
 
export default Menu;