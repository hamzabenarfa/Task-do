import Board from "./board";
import NewBoard from "./new-board";

const MyList = () => {
  return (
    <div className="m-2">
      <h1 className="font-bold ml-2 text-xl">My Lists</h1>
      <div className="grid grid-cols-2 gap-1 sm:grid-cols-3 ">
        <Board title="Personal" number={3} />
        <Board title="Work" number={11} />
        <Board title="Grocery List" number={4} />
        <NewBoard />
      </div>
    </div>
  );
};

export default MyList;
