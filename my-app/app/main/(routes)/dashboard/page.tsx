
import Navbar from "../_components/navbar";
import CalendarNav from "./_component/calendar-nav ";
import TimeBar from "./_component/time-bar";
import { format } from 'date-fns';
const Dashboard = () => {   
   
    const formattedDate = format(new Date(), 'EEEE, dd MMM yyyy');

    return (
        <section className="flex flex-col mx-auto md:max-w-2xl">
            <Navbar />
            <h1 className="ml-4">{formattedDate}</h1>
            <CalendarNav  />
            <TimeBar />
           
        </section>
    );
}

export default Dashboard;