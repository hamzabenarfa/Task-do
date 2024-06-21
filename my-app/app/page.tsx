import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import Head from "next/head";
import Link from "next/link";
import { FaSort, FaUsers, FaBell, FaUserPlus, FaTasks, FaClipboardList, FaCheckCircle } from "react-icons/fa";

const HomePage = () => {
  return (
    <div className="overflow-hidden bg-gray-50 text-gray-900">
      <Head>
        <title>Effortless Task Management | Task-Do</title>
        <meta name="description" content="Revolutionize the way you organize tasks with our intuitive and intelligent task management web app." />
      </Head>
      
      <Navbar />

      <main className="flex flex-col items-center justify-start mt-32">
        {/* Hero Section */}
        <section className="flex flex-col md:max-w-2xl text-center gap-6 mb-16 px-4">
          <h1 className="text-5xl md:text-7xl bg-gradient-to-r from-indigo-400 via-red-400 to-yellow-400 bg-clip-text font-extrabold text-transparent">
            Effortless Task Management, Elevated.
          </h1>
          <p className="text-xl md:text-3xl font-medium">
            Revolutionize the way you organize tasks with our intuitive and intelligent task management web app.
          </p>
          <Link href="/register">
            <Button variant="register" className="mt-6 px-8 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all">
              Get Started
            </Button>
          </Link>
        </section>

        {/* Features Section */}
        <section className="flex flex-col items-center justify-center gap-8 mb-16 px-4">
          <h2 className="text-3xl md:text-5xl font-bold">Key Features</h2>
          <div className="flex flex-col md:flex-row gap-8 text-center">
            {[
              {
                title: "Smart Task Sorting",
                description: "Automatically sort tasks based on priority and deadlines.",
                icon: <FaSort size={40} className="text-indigo-500"/>
              },
              {
                title: "Collaborative Tools",
                description: "Easily collaborate with your team and manage tasks together.",
                icon: <FaUsers size={40} className="text-red-500"/>
              },
              {
                title: "Real-Time Notifications",
                description: "Stay updated with real-time notifications on task progress.",
                icon: <FaBell size={40} className="text-yellow-500"/>
              }
            ].map((feature, index) => (
              <div key={index} className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow w-72">
                {feature.icon}
                <h3 className="text-2xl font-semibold mt-4">{feature.title}</h3>
                <p className="text-lg mt-2 text-center">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* How It Works Section */}
        <section className="flex flex-col items-center justify-center gap-8 mb-16 px-4">
          <h2 className="text-3xl md:text-5xl font-bold">How It Works</h2>
          <div className="flex flex-col md:flex-row gap-8 text-center">
            {[
              {
                title: "Step 1: Create an Account",
                description: "Sign up quickly and easily to start managing your tasks.",
                icon: <FaUserPlus size={40} className="text-green-500"/>
              },
              {
                title: "Step 2: Add Your Tasks",
                description: "Add tasks, set priorities, and deadlines effortlessly.",
                icon: <FaTasks size={40} className="text-blue-500"/>
              },
              {
                title: "Step 3: Stay Organized",
                description: "Use our tools to keep track of your tasks and collaborate with your team.",
                icon: <FaClipboardList size={40} className="text-purple-500"/>
              }
            ].map((step, index) => (
              <div key={index} className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow w-72">
                {step.icon}
                <h3 className="text-2xl font-semibold mt-4">{step.title}</h3>
                <p className="text-lg mt-2 text-center">{step.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="flex flex-col items-center justify-center gap-8 mb-16 px-4">
          <h2 className="text-3xl md:text-5xl font-bold">What Our Users Say</h2>
          <div className="flex flex-col md:flex-row gap-8 texb ">
            {[
              {
                quote: "Task-Do has completely changed the way I manage my work. It's intuitive and powerful!",
                author: "Alex Johnson",
                icon: <FaCheckCircle size={40} className="text-indigo-500"/>
              },
              {
                quote: "The best task management app I've used. Real-time notifications keep me on track.",
                author: "Maria Garcia",
                icon: <FaCheckCircle size={40} className="text-red-500"/>
              },
              {
                quote: "Collaborating with my team has never been easier. Highly recommend Task-Do!",
                author: "John Smith",
                icon: <FaCheckCircle size={40} className="text-yellow-500"/>
              }
            ].map((testimonial, index) => (
              <div key={index} className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow w-72">
                {testimonial.icon}
                <p className="text-lg italic mt-4">"{testimonial.quote}"</p>
                <p className="text-lg font-semibold mt-4">- {testimonial.author}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Pricing Section */}
        <section className="flex flex-col items-center justify-center gap-8 mb-16 px-4">
          <h2 className="text-3xl md:text-5xl font-bold">Pricing Plans</h2>
          <div className="flex flex-col md:flex-row gap-8">
            {[
              {
                plan: "Free Plan",
                price: "$0/month",
                description: "Basic features to get started with task management.",
                icon: <FaCheckCircle size={40} className="text-green-500"/>
              },
              {
                plan: "Pro Plan",
                price: "$9.99/month",
                description: "Advanced features for power users and teams.",
                icon: <FaCheckCircle size={40} className="text-blue-500"/>
              },
              {
                plan: "Enterprise Plan",
                price: "Custom pricing",
                description: "Comprehensive solutions for large organizations.",
                icon: <FaCheckCircle size={40} className="text-purple-500"/>
              }
            ].map((pricing, index) => (
              <div key={index} className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow w-72">
                {pricing.icon}
                <h3 className="text-2xl font-semibold mt-4">{pricing.plan}</h3>
                <p className="text-lg mt-2">{pricing.price}</p>
                <p className="text-lg mt-2 text-center">{pricing.description}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="flex flex-col items-center justify-center py-8 bg-gray-800 text-white">
        <p>&copy; 2024 Task-Do. All rights reserved.</p>
        <div className="flex gap-4 mt-4">
          <Link href="/about">
            <p className="hover:underline">About</p>
          </Link>
          <Link href="/contact">
            <p className="hover:underline">Contact</p>
          </Link>
          <Link href="/privacy">
            <p className="hover:underline">Privacy Policy</p>
          </Link>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
