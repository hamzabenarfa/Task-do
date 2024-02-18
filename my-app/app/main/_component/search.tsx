import { Input } from "@/components/ui/input";
import {  User2 } from "lucide-react";
import AddBtn from "../(routes)/_components/addBtn";
import OperationalHours from "../(routes)/_components/opertionalHoursModal";

const Search = () => {
  return (
    <div className="flex justify-center items-center gap-2 m-4">
      <div className="w-10 h-10 bg-gray-100 rounded-3xl flex justify-center items-center cursor-pointer">
      <User2 />
      </div>
      <Input
        type="search"
        className="rounded-3xl border border-gray-200 bg-gray-100"
        placeholder="Search for tasks, events, ect..."
      />
     
     <OperationalHours />

     <AddBtn />
     
    </div>
  );
};

export default Search;
