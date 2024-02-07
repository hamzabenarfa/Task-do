import { Navbar } from "@/components/Navbar";
import Head from "next/head";
import Link from "next/link";

const HomePage = () => {
  return (
    <div className=" overflow-hidden">
      <Navbar />
      <Head>
        <title>Your Task App</title>
        <meta
          name="description"
          content="Effortless Task Management with Your Task App"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

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
        <div className="mt-8 flex flex-col items-center justify-center">
          <Link href="/main">
            <p className="rounded-3xl bg-blue-500 px-4 py-2 text-2xl font-bold text-white hover:bg-blue-600">
              Get Started
            </p>
          </Link>
        </div>
      </main>

      <footer className="flex items-center justify-center">
        <p>&copy; 2024 Task-Do. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;
