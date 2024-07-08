"use client"
import AddBtn from "./addBtn";
import OperationalHours from "./opertionalHoursModal";
import useUserData from "@/hooks/useUserData";
import { Spinner } from "@/components/spinner";
import ProfileMenuTrigger from "./profile-menu-trigger";
const Navbar = () => {

  const userData = useUserData();
  if (!userData) return 
    <div className="flex items-center justify-start pl-4 sw-full h-10 bg-gray-100">
      <Spinner /> 
    </div>;

  return (
    <div className="flex justify-center items-center gap-1 py-4 px-1 mb-2">
      <ProfileMenuTrigger />
      <div className="flex flex-col w-full">
        {userData && (
          <>
            <h1 className="font-bold capitalize">Hi , {(userData as { name: string }).name} </h1>
            <p className="hidden lg:block text-sm font-thin">Your daily adventure starts now</p>
          </>
        )}
      </div>

      <OperationalHours />

      <AddBtn />

    </div>
  );
};

export default Navbar;
