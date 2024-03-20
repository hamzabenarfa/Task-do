import Link from "next/link";

export const Logo = () => {
  return (
    <div className="  bg-sky-300   bg-clip-text  
        text-3xl md:text-5xl font-bold text-transparent">
      <Link href="/">
        Task-Do
      </Link>
    </div>
  );
};
