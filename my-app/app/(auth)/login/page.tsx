"use client"
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Logo } from "@/components/Logo";

import authService from "@/service/auth.service";
import { Loader2 } from "lucide-react";

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
                setErrorMessage( res.error ? res.error : "An unknown error occurred."); 
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }


    return (
        <div className="min-h-screen flex items-center justify-around ">
            <div className="hidden lg:block">
                <Image
                    src="/login.png"
                    alt="Login"
                    width={500}
                    height={600}
                />
            </div>
            <div className="h-full flex flex-col space-y-8 p-10 py-4 bg-white m-2 shadow-md rounded-xl md:max-w-xs">
                <Logo />
                <div className="space-y-1">
                    <h1>Login</h1>
                    <p className="font-light text-xs text-gray-500">
                        Please login to our platform if you are already registered
                    </p>
                </div>
                <form className="flex flex-col gap-4 mt-4" onSubmit={handleSubmit}>
                    <input
                        type="email"
                        placeholder="email"
                        className="p-2 border-2 border-gray-200 rounded-md"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className="p-2 border-2 border-gray-200 rounded-md"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button type="submit" disabled={isLoading} className="p-2 bg-orange-300 text-white rounded-md hover:bg-orange-500">
                        {isLoading ? <Loader2 className="animate-spin mx-auto" /> : "Login"}
                    </button>
                    {errorMessage && <p className="text-red-500 text-xs mt-2">{errorMessage}</p>}
                </form>
                <div className="flex flex-col items-center justify-center gap-4">
                    <p className="text-center font-light text-xs text-gray-500">Or</p>
                    <p className="font-light text-xs text-gray-500">
                        Don&apos;t have an account? <Link href="/register" className="text-orange-500 underline">Register</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Login;
