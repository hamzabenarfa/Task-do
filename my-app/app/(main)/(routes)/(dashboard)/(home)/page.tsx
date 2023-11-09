import Menu from "./_component/menu";
import MyList from "./_component/my-list";
import Search from "./_component/search";

const Home = () => {
  return (
    <div className="lg:mx-40 xl:mx-60 min-h-screen flex flex-col justify-between">
      <div>
        <Search />
        <MyList />
      </div>
      <Menu />
    </div>
  );
};

export default Home;
