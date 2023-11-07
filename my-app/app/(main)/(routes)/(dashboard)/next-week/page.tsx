"use client";

import Header from "../_components/header";
import Menu from "../_components/menu";
const nextweek = () => {
  return (
    <div>
      <Header title="NEXT 7 DAYS"/>
      {/* <Main /> */}
        <Menu updateData={()=>""} />
    </div>
  );
};

export default nextweek;
