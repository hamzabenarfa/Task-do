import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { LogOut, User, User2 } from "lucide-react";

import { useRouter } from "next/navigation";


const ProfileMenuTrigger = () => {
  const router = useRouter();

  function handleLogout() {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    router.push("/login");
  }
  function handleProfile() {
    router.push("/main/profile");

  }
  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger >
          <div className="w-10 h-10 bg-gray-100 rounded-xl flex justify-center items-center cursor-pointer">
            <User2 />
          </div>
        </MenubarTrigger>
        <MenubarContent >
          <MenubarItem onClick={handleProfile} className=" cursor-pointer">
            <p> Profile </p><User className="w-4 h-4 ml-auto" />
          </MenubarItem>
          <MenubarItem onClick={handleLogout} className=" cursor-pointer">
            <p> Logout </p><LogOut className="w-4 h-4 ml-auto" />
          </MenubarItem>

        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}

export default ProfileMenuTrigger;