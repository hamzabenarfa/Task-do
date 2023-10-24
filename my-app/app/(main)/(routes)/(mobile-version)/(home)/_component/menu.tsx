import { Shell,CalendarDays,Check, Calendar } from "lucide-react";
import Link from "next/link";

const Menu = () => {
    return ( 
        <div className="flex items-center justify-evenly m-4 border p-2 border-gray-100 shadow-lg rounded-3xl">
            <div className="flex items-center justify-center flex-col text-blue-500 ">
             <Link href="myday"><Shell size={24} /></Link>
                <p className="text-xs fony-bold">My Day</p>
            </div>
            <div className="flex items-center justify-center flex-col text-blue-500 ">
                <Link href="next-week"> <CalendarDays size={24} /></Link>
                <p className="text-xs fony-bold">Next 7 days</p>
            </div>
            <div className="flex items-center justify-center flex-col text-blue-500 ">
                <Link href="all-tasks"> <Check size={24} /></Link>
                <p className="text-xs fony-bold">All Tasks</p>
            </div>
            <div className="flex items-center justify-center flex-col text-blue-500 ">
                <Link href="calendar"> <Calendar size={24} /></Link>
                <p className="text-xs fony-bold">Calendar</p>
            </div>
        </div>
     );
}
 
export default Menu;