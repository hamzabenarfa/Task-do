"use client";
import { useState,useEffect } from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface MainProps {
  data: string;
}

const Main = ({data}:MainProps) => {
  const [mainData, setMainData] = useState(data);
  useEffect(() => {
    setMainData(data);
  }, [data]);

  

  return (
    <main className="p-6">
      <RadioGroup defaultValue="option-one">
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="option-one" id="option-one" />
          <Label htmlFor="option-one" className="font-light">{data}</Label>
        </div>
      </RadioGroup>
    </main>
  );
};

export default Main;
