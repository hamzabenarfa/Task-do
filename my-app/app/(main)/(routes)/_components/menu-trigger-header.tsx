import { Button } from "@/components/ui/button";
import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarSeparator,
    MenubarShortcut,
    MenubarTrigger,
  } from "@/components/ui/menubar";
import {CircleEllipsis} from "lucide-react";

const MenuTrigger = () => {
    return ( 
        <Menubar>
        <MenubarMenu>
          <MenubarTrigger >
            <Button size="icon" variant="link">
              <CircleEllipsis size={24} className="text-gray-400" />
            </Button>
          </MenubarTrigger>
          <MenubarContent>
            <MenubarItem>
              New Tab <MenubarShortcut>⌘T</MenubarShortcut>
            </MenubarItem>
            <MenubarItem>New Window</MenubarItem>
            <MenubarSeparator />
            <MenubarItem>Share</MenubarItem>
            <MenubarSeparator />
            <MenubarItem>Print</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
     );
}
 
export default MenuTrigger;