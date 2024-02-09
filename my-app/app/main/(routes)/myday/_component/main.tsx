"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Spinner } from "@/components/spinner";

const Main = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios.get("http://localhost:4000/schedule/get")
      .then(res => {
        const scheduledItems = res.data.flatMap(item => item._scheduledItems).map(item => ({
          id: item._id, 
          task: item._task,
          duration:item._duration,
          startAt: item._startAt
        }));
        setData(scheduledItems);
        setIsLoading(false);
      })
      .catch(error => {
        console.error("Fetching data failed:", error);
        setIsLoading(false);
      });
  }, []);
  console.log(data)

  return (
    <main className="p-6">
      {isLoading ? (
        <h1 className="flex items-center gap-1">Loading  <Spinner /></h1>
      ) : (
        <RadioGroup defaultValue={data.length > 0 ? data[0].id.toString() : ''}>
          {data.map((item, index) => (
            <div key={item.id} className="flex items-center space-x-2 bg-gray-100 p-4 rounded-2xl">
              <RadioGroupItem value={item.id.toString()} id={`option-${item.id}`} />
              <Label htmlFor={`option-${item.id}`} className="font-light">{item.task}</Label>
            </div>
          ))}
        </RadioGroup>
      )}
    </main>
  );
};

export default Main;
