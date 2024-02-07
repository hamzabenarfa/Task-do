import { Input } from "@/components/ui/input";

const Search = () => {
  return (
    <div className=" m-4">
      <Input
        type="search"
        className="rounded-3xl border border-gray-200 bg-gray-100"
        placeholder="Search for tasks, events, ect..."
      />
    </div>
  );
};

export default Search;
