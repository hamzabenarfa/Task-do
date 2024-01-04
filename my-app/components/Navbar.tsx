import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";

export const Navbar = () => {
    return ( 
        <nav className="flex items-center justify-between px-8 p-2">
            <Logo />
            <Button  variant="login">Log in</Button>

        </nav>
     );
}
 
