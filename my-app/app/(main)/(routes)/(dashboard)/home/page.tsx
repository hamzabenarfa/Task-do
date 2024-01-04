import Menu from "./_component/menu";
import MyList from "./_component/my-list";
import Search from "./_component/search";

const Home = () => {
  return (
    <div className="flex min-h-screen flex-col justify-between lg:mx-40 xl:mx-60	">
      <div>
        <Search />
        <MyList />
      </div>
      <Menu />
    </div>
  );
};

export default Home;
