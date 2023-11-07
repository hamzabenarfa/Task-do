import { Button } from "@/components/ui/button";


const NewBoard = () => {
  return (
    <Button variant="ghost" className="flex items-center justify-center border border-gray-200 w-full h-32 md:h-64 rounded-xl shadow-lg m-1 ">
      <p className="text-blue-500 font-thin text-7xl">+</p>
    </Button>
  );
};

export default NewBoard;
