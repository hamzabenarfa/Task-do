"use client";
import { Home} from "lucide-react";
import Link from "next/link";
import AddBtn from "./addBtn";


const Menu = () => {


    return (
        <div className="flex items-center justify-between m-4 pt-2">
            <Link href="/main">
                <Home size={28} className="text-blue-500 ml-2" />
            </Link>
            <AddBtn />
        </div>
    );
};

export default Menu;
