interface BoardProps {
  number: number;
  title: string;
}

const Board = ({number,title} : BoardProps) => {
  return (
    <div className="border border-gray-200 h-32 w-40 rounded-xl shadow-lg m-1  ">
      <div className="grid grid-rows-2 h-full w-full">
        <div className="flex items-center justify-center justify-self-end mt-2 mr-2 bg-gray-100 rounded-full w-6 h-6">
          <p className="text-gray-500 text-sm">{number}</p>
        </div>
        <div className="justify-self-center ">
          <p className="text-gray-900 font-normal">{title}</p>
        </div>
      </div>
    </div>
  );
};

export default Board;
