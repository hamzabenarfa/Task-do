import Menu from "../_components/menu";

const Calendar = () => {
  return (
    <div>
      <div className="fixed bottom-0 left-0 w-full ">
        <Menu updateData={()=>""} />
      </div>
    </div>
  );
};

export default Calendar;
