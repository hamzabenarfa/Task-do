"use client"
import { Button } from "@/components/ui/button";

import { useRouter } from "next/navigation";

interface BoardProps {
  number: number;
  title: string;
}

const Board = ({ number, title }: BoardProps) => {
  const router = useRouter();
  
  const id = 1;
  const onClick = () => {
    router.push(`/home/${id}`);

  };

  return (
    <Button variant="ghost" onClick={onClick} className="border border-gray-200 w-full h-32 md:h-64 rounded-xl shadow-lg m-1 relative">
      <div className="flex items-center justify-end absolute top-2 right-2">
        <div className="bg-gray-100 rounded-full w-6 h-6 flex items-center justify-center">
          <p className="text-gray-500 text-sm">{number}</p>
        </div>
      </div>
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-900 font-normal">{title}</p>
      </div>
    </Button>
  );
};

export default Board;
