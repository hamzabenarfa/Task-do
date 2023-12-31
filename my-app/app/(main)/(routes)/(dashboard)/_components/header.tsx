import { Button } from "@/components/ui/button";
import {  Square } from "lucide-react";
import MenuTrigger from "./menu-trigger-header";


interface HeaderProps {
  title: string;
}
const Header = ({ title }: HeaderProps) => {
  return (
    <header className="flex items-center justify-between p-2">
      <Button size="icon" variant="link">
        <Square size={24} className="text-gray-400" />
      </Button>
      <h1 className="font-bold text-base">{title}</h1>
      <MenuTrigger />
    </header>
  );
};

export default Header;
