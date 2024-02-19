"use client"
import Link from "next/link";
import Image from "next/image";
import {  useState } from "react";

import { useRouter } from "next/navigation";

const Login = () => {
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch('http://localhost:4000/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                // Save the accessToken in localStorage or context
                localStorage.setItem('accessToken', data.accessToken);
                localStorage.setItem('user', JSON.stringify(data.userInfo));
                router.push("/main/dashboard");

            } else {
                throw new Error(data.message || "An error occurred");
            }
        } catch (error) {
            setErrorMessage(error.message);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-around">
            <div className="hidden lg:block">
                <Image
                    src="/register.png"
                    alt="Login"
                    width={500}
                    height={600}
                />
            </div>
            <div className="h-full flex flex-col space-y-8 p-4 py-4 bg-white m-2 shadow-md rounded-xl md:max-w-xs">
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
                    <button type="submit" className="p-2 bg-orange-300 text-white rounded-md hover:bg-orange-500">
                        Login
                    </button>
                    {errorMessage && <p className="text-red-500 text-xs mt-2">{errorMessage}</p>}
                </form>
                <div className="flex flex-col items-center justify-center gap-4">
                    <p className="text-center font-light text-xs text-gray-500">Or</p>
                    <p className="font-light text-xs text-gray-500">
                        Don't have an account? <Link href="/register" className="text-orange-500 underline">Register</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Login;
