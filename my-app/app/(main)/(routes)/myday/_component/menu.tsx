import { Input } from "@/components/ui/input";
import { Home } from "lucide-react";

const Menu = () => {
    return ( 
    <div className="flex items-center justify-center m-4 pt-2 ">
        <Home size={28} className="text-blue-500 ml-2 " />
        <Input type="search"
                   className="border border-gray-200 shadow-lg h-14 rounded-3xl ml-4"
                   placeholder="I Want to..." />

    </div> );
}
 
export default Menu;