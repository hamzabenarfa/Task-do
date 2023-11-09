"use client";

import Header from "../_components/header";
import Menu from "../_components/menu";
const nextweek = () => {
  return (
    <div className="min-h-screen flex flex-col justify-between">
      <Header title="NEXT 7 DAYS"/>
      {/* <Main /> */}
        <Menu updateData={()=>""} />
    </div>
  );
};

export default nextweek;
