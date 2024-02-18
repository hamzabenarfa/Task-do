import Search from "../../_component/search";
import CalendarNav from "./_component/calendar-nav ";
import TimeBar from "./_component/time-bar";
const Dashboard = () => {
    return (
        <div className="flex flex-col mx-auto  md:max-w-2xl">
            <Search />
            <h1 className="ml-4" >saturday ,17 fev 2024 </h1>
            <CalendarNav  />

            <TimeBar />
           

        </div>
    );
}

export default Dashboard;