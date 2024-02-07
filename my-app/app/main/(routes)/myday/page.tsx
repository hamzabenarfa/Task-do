"use client"
import { useState } from "react";
import MainLayout from "../MainLayout"; // Import MainLayout
import Main from "./_component/main";

const MyDay = () => {
  const [mainData, setMainData] = useState("");

  const updateMainData = (newData: string) => {
    setMainData(newData);
  };

  return (
    <MainLayout
      headerTitle="MY DAY"
      menuUpdateData={updateMainData}
    >
      <Main data={mainData} />
    </MainLayout>
  );
};

export default MyDay;
