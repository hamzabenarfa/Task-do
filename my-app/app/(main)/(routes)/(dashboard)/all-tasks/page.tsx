"use client";

import Header from "../_components/header";
import Menu from "../_components/menu";
const AllTasks = () => {
  
  return (
    <div className="min-h-screen flex flex-col justify-between">
      <Header title="ALL TASKS"/>
      {/* <Main /> */}
        <Menu updateData={()=>""} />
    </div>
  );
};

export default AllTasks;
