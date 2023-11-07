"use client";

import Header from "../_components/header";
import Menu from "../_components/menu";
const AllTasks = () => {
  
  return (
    <div>
      <Header title="ALL TASKS"/>
      {/* <Main /> */}
        <Menu updateData={()=>""} />
    </div>
  );
};

export default AllTasks;
