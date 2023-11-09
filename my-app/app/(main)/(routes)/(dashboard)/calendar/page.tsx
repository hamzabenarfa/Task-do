"use client";

import Header from "../_components/header";
import Menu from "../_components/menu";

const Calendar = () => {
  return (
    <div className="min-h-screen flex flex-col justify-between">
        <Header title="Calander"/>

        <Menu updateData={()=>""} />
    </div>
  );
};

export default Calendar;
