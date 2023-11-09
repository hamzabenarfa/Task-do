"use client";
import { useState, ChangeEventHandler } from "react";
import { Input } from "@/components/ui/input";
import { Home } from "lucide-react";
import Link from "next/link";

interface MenuProps {
    updateData: (newData:string) => void ;
}

const Menu = ({updateData}:MenuProps) => {
    const [task, setTask] = useState("");
    
    const handleTaskChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        setTask(e.target.value);
        addEventListener("keydown", (e) => {
            if (e.key === "Enter") {
                updateData(task);
                setTask("");
            }
        })
    };
    return ( 
    <div className=" flex items-center justify-center m-4 pt-2 ">
       <Link href="/"> <Home size={28} className="text-blue-500 ml-2 " /></Link>
        <input type="search"
               className="border border-gray-200 px-4 shadow-lg h-14 rounded-3xl ml-4 w-full  "
               placeholder="I Want to..."
               value={task}
               onChange={handleTaskChange}
                />
    </div> 
    );
}
 
export default Menu;