"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Logo } from "@/components/Logo";
import authService from "@/service/auth.service";
import { Loader2, User, Mail, Lock } from "lucide-react";
import Image from "next/image";
const Register = () => {
    const router = useRouter();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (password !== repeatPassword) {
            setErrorMessage("Passwords do not match");
            return;
        }
        try {
            setIsLoading(true);
            const res: any = await authService.register(username, email, password);
            
            if (res.data) {
                router.push("/login");
            } else {
                setErrorMessage(res.response?.data?.error || "An unknown error occurred");
            }
        } catch (error) {
            setErrorMessage(String(error) || "An error occurred while registering");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-around bg-gray-100">
            <div className="flex flex-col items-center space-y-8 p-10 py-8 bg-white text-gray-900 shadow-xl rounded-xl w-full max-w-md">
                <Logo />
                <div className="text-center">
                    <h1 className="text-3xl font-bold">Create Account 👋</h1>
                    <p className="font-light text-sm text-gray-600">
                        Please register to our platform if you are new here
                    </p>
                </div>
                <form className="flex flex-col gap-4 w-full" onSubmit={handleSubmit}>
                    <div className="relative">
                        <User className="absolute left-3 top-3 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Username"
                            className="w-full p-3 pl-10 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="relative">
                        <Mail className="absolute left-3 top-3 text-gray-400" />
                        <input
                            type="email"
                            placeholder="Email"
                            className="w-full p-3 pl-10 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="relative">
                        <Lock className="absolute left-3 top-3 text-gray-400" />
                        <input
                            type="password"
                            placeholder="Password"
                            className="w-full p-3 pl-10 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="relative">
                        <Lock className="absolute left-3 top-3 text-gray-400" />
                        <input
                            type="password"
                            placeholder="Repeat Password"
                            className="w-full p-3 pl-10 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500"
                            value={repeatPassword}
                            onChange={(e) => setRepeatPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit" disabled={isLoading} className="p-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-all">
                        {isLoading ? <Loader2 className="animate-spin mx-auto" /> : "Register"}
                    </button>
                    {errorMessage && <p className="text-red-500 text-sm mt-2 text-center">{errorMessage}</p>}
                </form>
                <div className="text-center">
                    <p className="font-light text-sm text-gray-600">Or</p>
                    <p className="font-light text-sm text-gray-600">
                        Already have an account? <Link href="/login" className="text-indigo-500 underline">Log in</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Register;
