import { Button } from "@/components/ui/button";
import { CircleEllipsis, Square } from "lucide-react";

interface HeaderProps {
  title: string;
}
const Header = ({title}:HeaderProps) => {
  return (
    <header className="flex items-center justify-between p-2">
      <Button size="icon" variant="link">
        <Square size={24} className="text-gray-400" />
      </Button>
      <h1 className="font-bold text-base">{title}</h1>
      <Button size="icon" variant="link">
        <CircleEllipsis size={24} className="text-gray-400" />
      </Button>
    </header>
  );
};

export default Header;
