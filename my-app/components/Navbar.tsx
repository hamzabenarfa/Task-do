import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import Link from "next/link";


export const Navbar = () => {
    return (
        <nav className="flex items-center justify-around  p-6">
            <Logo />
            
            <Link href="login">
                <Button variant="login">Login</Button>
            </Link>

        </nav>
    );
}

