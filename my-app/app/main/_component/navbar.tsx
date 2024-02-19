import { User2 } from "lucide-react";
import AddBtn from "../(routes)/_components/addBtn";
import OperationalHours from "../(routes)/_components/opertionalHoursModal";

const Navbar = () => {
  return (
    <div className="flex justify-center items-center gap-2 p-4  mb-2">
      <div className="w-10 h-10 bg-gray-100 rounded-3xl flex justify-center items-center cursor-pointer">
        <User2 /> 
        {/**
         * this user icon when clicked it will show user info
         * he can modify his info
         * he can logout
         */}
      </div>
      <div className="flex flex-col w-full">
        <h1 className=" font-bold">Hi , Hamza </h1>
        <p className="text-sm font-thin">Your daily adventure starts now</p>
      </div>

      <OperationalHours />

      <AddBtn />

    </div>
  );
};

export default Navbar;
