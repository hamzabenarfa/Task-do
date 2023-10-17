import Header from "../_components/header";
import Menu from "../_components/menu";
const AllTasks = () => {
  
  return (
    <div>
      <Header title="ALL TASKS"/>
      {/* <Main /> */}
      <div className="fixed bottom-0 left-0 w-full ">
        <Menu updateData={()=>""} />
      </div>
    </div>
  );
};

export default AllTasks;
