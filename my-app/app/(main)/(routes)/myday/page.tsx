import Header from "../_components/header";
import Menu from "../_components/menu";
import Main from "./_component/main";


const MyDay = () => {
  return (
    <div>
      <Header title="MY DAY"/>
      <Main />
      <div className="fixed bottom-0 left-0 w-full ">
        <Menu />
      </div>
    </div>
  );
};

export default MyDay;
