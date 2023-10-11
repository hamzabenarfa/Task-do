import Menu from "./_component/menu";
import MyList from "./_component/my-list";
import Search from "./_component/search";

const Home = () => {
  return (
    <div className="md:mx-1/2">
      <Search />
      <MyList />
      <div className="fixed bottom-0 left-0 w-full ">
        <Menu />
      </div>
    </div>
  );
};

export default Home;
