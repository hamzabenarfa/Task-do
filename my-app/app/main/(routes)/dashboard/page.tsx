'use client'
import Navbar from "../../_component/navbar";
import CalendarNav from "./_component/calendar-nav ";
import TimeBar from "./_component/time-bar";

import useAuthCheck from '@/hooks/useAuthCheck';
const Dashboard = () => {
    const isAuthChecked = useAuthCheck(); 

    if (!isAuthChecked) {
        return <div></div>; 
    }

    return (
        <div className="flex flex-col mx-auto  md:max-w-2xl">
            <Navbar />
            <h1 className="ml-4" >saturday ,17 fev 2024 </h1>
            <CalendarNav  />

            <TimeBar />
           

        </div>
    );
}

export default Dashboard;