import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import Link from "next/link";


export const Navbar = () => {
    return (
        <nav className="flex items-center justify-between md:px-8 p-6">
            <Logo />
            <Link href="register">
                <Button variant="login">Register</Button>
            </Link>

        </nav>
    );
}

