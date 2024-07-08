"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Logo } from "@/components/Logo";
import authService from "@/service/auth.service";
import { Loader2, Mail, Lock } from "lucide-react";

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      setIsLoading(true);
      const res = await authService.login(email, password);
      if (!res.error) {
        router.push("/main/dashboard");
      } else {
        setErrorMessage(res.error ? res.error : "An unknown error occurred.");
      }
    } catch (error) {
      console.error(error);
      setErrorMessage("An error occurred while logging in.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-around  bg-gray-100">
      <div className="hidden lg:block">
        <Image
          src="/login.png"
          alt="Login"
          width={500}
          height={600}
          className="rounded-xl"
        />
      </div>
      <div className="flex h-full w-full max-w-md flex-col space-y-8 rounded-xl bg-white p-10 py-8 text-gray-900 shadow-xl">
        <Logo />
        <div className="text-center">
          <h1 className="text-3xl font-bold">Login</h1>
          <p className="text-sm font-light text-gray-600">
            Please login to our platform if you are already registered
          </p>
        </div>
        <form className="flex w-full flex-col gap-4" onSubmit={handleSubmit}>
          <div className="relative">
            <Mail className="absolute left-3 top-3 text-gray-400" />
            <input
              type="email"
              placeholder="Email"
              className="w-full rounded-md border-2 border-gray-200 p-3 pl-10 focus:border-indigo-500 focus:outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-3 text-gray-400" />
            <input
              type="password"
              placeholder="Password"
              className="w-full rounded-md border-2 border-gray-200 p-3 pl-10 focus:border-indigo-500 focus:outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="rounded-md bg-indigo-600 p-3 text-white transition-all hover:bg-indigo-700"
          >
            {isLoading ? <Loader2 className="mx-auto animate-spin" /> : "Login"}
          </button>
          {errorMessage && (
            <p className="mt-2 text-center text-sm text-red-500">
              {errorMessage}
            </p>
          )}
        </form>
        <div className="text-center">
          <p className="text-sm font-light text-gray-600">Or</p>
          <p className="text-sm font-light text-gray-600">
            Don `&apos;`t have an account?{" "}
            <Link href="/register" className="text-indigo-500 underline">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
