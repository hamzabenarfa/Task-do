import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import Link from "next/link";


export const Navbar = () => {
    return (
        <nav className="flex items-center justify-between md:px-8 p-2 ">
            <Logo />
            <Link href="main">
                <Button variant="login">Log in</Button>
            </Link>

        </nav>
    );
}

