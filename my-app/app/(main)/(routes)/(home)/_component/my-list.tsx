import Board from "./board";
import NewBoard from "./new-board";

const MyList = () => {
  return (
    <div className="m-4 ">
      <h1 className="font-bold">My Lists</h1>
      <div className="flex flex-wrap">
        <Board />
        <Board />
        <Board />
        <NewBoard />
      </div>
    </div>
  );
};

export default MyList;
