import { Navbar } from "@/components/Navbar";
import Head from "next/head";
import Link from "next/link";

const HomePage = () => {
  return (
    <div className=" overflow-hidden">
      <Navbar />
   

      <main className="flex min-h-screen flex-col items-center justify-center gap-2 ">
        <div className=" md:max-w-2xl  ">
          <h1 className=" text-5xl md:text-7xl bg-gradient-to-tl from-sky-400 to-sky-200 bg-clip-text  font-bold text-transparent">
            Effortless Task Management, Elevated.
          </h1>
          <p className=" text-xl md:text-3xl font-medium">
            Revolutionize the way you organize tasks with our intuitive and
            intelligent task management web app.
          </p>
        </div>
     
      </main>

      <footer className="flex items-center justify-center">
        <p>&copy; 2024 Task-Do. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;
