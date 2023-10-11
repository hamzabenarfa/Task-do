import Header from "./_component/header";
import Main from "./_component/main";
import Menu from "./_component/menu";


const MyDay = () => {
  return (
    <div>
      <Header />
      <Main />
      <div className="fixed bottom-0 left-0 w-full ">
        <Menu />
      </div>
    </div>
  );
};

export default MyDay;
