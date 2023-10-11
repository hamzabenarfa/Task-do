import { Button } from "@/components/ui/button";
import { CircleEllipsis, Square } from "lucide-react";

const Header = () => {
  return (
    <header className="flex items-center justify-between p-2">
      <Button size="icon" variant="link">
        <Square size={24} className="text-gray-400" />
      </Button>
      <h1 className="font-bold text-base">MY DAY</h1>
      <Button size="icon" variant="link">
        <CircleEllipsis size={24} className="text-gray-400" />
      </Button>
    </header>
  );
};

export default Header;
