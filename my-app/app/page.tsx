import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import Head from "next/head";
import Link from "next/link";

const HomePage = () => {
  return (
    <div className=" overflow-hidden">
      <Navbar />
   

      <main className="flex  flex-col items-center justify-start mt-32  ">
        <div className="flex flex-col md:max-w-2xl text-center gap-6 ">
          <div>

          <h1 className=" text-5xl md:text-7xl bg-gradient-to-r from-indigo-200 via-red-200 to-yellow-100 bg-clip-text  font-bold text-transparent">
            Effortless Task Management, Elevated.
          </h1>

          <p className="text-xl md:text-3xl font-medium">
            Revolutionize the way you organize tasks with our intuitive and
            intelligent task management web app.
          </p>

          </div>
          <Link href="/register">
            <Button variant="register" >
              Get Started
            </Button>
          </Link>
        </div>
     
      </main>

      {/* <footer className="flex items-center justify-center">
        <p>&copy; 2024 Task-Do. All rights reserved.</p>
      </footer> */}
    </div>
  );
};

export default HomePage;
