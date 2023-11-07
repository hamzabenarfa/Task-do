import Menu from "./_component/menu";
import MyList from "./_component/my-list";
import Search from "./_component/search";

const Home = () => {
  return (
    <div className="lg:mx-40 xl:mx-60 ">
      <Search />
      <MyList />
      <Menu />
    </div>
  );
};

export default Home;
