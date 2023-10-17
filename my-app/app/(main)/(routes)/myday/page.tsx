"use client"
import { useState } from "react";
import Header from "../_components/header";
import Menu from "../_components/menu";
import Main from "./_component/main";


const MyDay = () => {
  const [mainData, setMainData] = useState("");
  const updateMainData  = (newData:string) => {
    setMainData(newData);
  };
  return (
    <div>
      <Header title="MY DAY"/>
      <Main data={mainData} />
      <div className="fixed bottom-0 left-0 w-full ">
        <Menu updateData={updateMainData}/>
      </div>
    </div>
  );
};

export default MyDay;
