import Header from "../_components/header";
import Menu from "../_components/menu";
const nextweek = () => {
  return (
    <div>
      <Header title="NEXT 7 DAYS"/>
      {/* <Main /> */}
      <div className="fixed bottom-0 left-0 w-full ">
        <Menu />
      </div>
    </div>
  );
};

export default nextweek;
