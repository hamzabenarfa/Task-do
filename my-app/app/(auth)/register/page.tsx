"use client"
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Logo } from "@/components/Logo";
import authService from "@/service/auth.service";
import { Loader2 } from "lucide-react";

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
        
        if(password !== repeatPassword) {
            setErrorMessage("Passwords do not match");
            return; 
        }
        try {
            setIsLoading(true);
            const res = await authService.register(username, email, password);
            console.log("🚀 ~ handleSubmit ~ res:", res)
            if (res.data) {
                router.push("/login");
            } else {                setErrorMessage(res.response?.data?.error || "An unknown error occurred");

            }
         
        } catch (error) {
            console.log(error);
            setErrorMessage(String(error) || "An error occurred while registering");

        } finally {
            setIsLoading(false); 
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-around">
            
            {/* <div className="hidden lg:block">
                <Image
                    src="/login.png"
                    alt="Register"
                    width={500}
                    height={600}
                />
            </div> */}
            <div className="h-full flex flex-col space-y-8 p-10 py-4 bg-white m-2 shadow-md rounded-xl md:max-w-xs">
            <Logo />
                <div className="space-y-1">
                    <h1>Create Account 👋</h1>
                    <p className="font-light text-xs text-gray-500">
                        Please register to our platform if you are new here
                    </p>
                </div>
                <form className="flex flex-col gap-4 mt-4" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Username"
                        className="p-2 border-2 border-gray-200 rounded-md"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <input
                        type="email"
                        placeholder="Email"
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
                    <input
                        type="password"
                        placeholder="Repeat Password"
                        className="p-2 border-2 border-gray-200 rounded-md"
                        value={repeatPassword}
                        onChange={(e) => setRepeatPassword(e.target.value)}
                    />
                     <button type="submit" disabled={isLoading} className="p-2 bg-orange-300 text-white rounded-md hover:bg-orange-500">
                        {isLoading ? <Loader2 className="animate-spin mx-auto" /> : "Register"}
                    </button>
                    {errorMessage && <p className="text-red-500 text-xs mt-2">{errorMessage}</p>}
                </form>
                <div className="flex flex-col items-center justify-center gap-4">
                    <p className="font-light text-xs text-gray-500">Or</p>
                    <p className="font-light text-xs text-gray-500">
                        Already have an account? <Link href="/login" className="text-orange-500 underline">Log in</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Register;
