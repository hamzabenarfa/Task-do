import { Button } from "@/components/ui/button";
import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarTrigger,
  } from "@/components/ui/menubar";
import taskService from "@/service/task.service";
import { MoreVertical,  Trash2} from "lucide-react";

const MenuTrigger = ({id}) => {
  const handleDelete = async () => {
    const result = await taskService.deleteTask(id);
    if (result.data) {
        console.log("Task deleted");
        window.location.reload();
      } else if (result.error) {
        console.error("Error deleting task:", result.error);
    }
};
    return ( 
        <Menubar>
        <MenubarMenu>
          <MenubarTrigger >
            <Button size="icon" variant="link">
            <MoreVertical className="w-6 h-6 cursor-pointer" />
            </Button>
          </MenubarTrigger>
          <MenubarContent >
            {/* <MenubarItem className=" cursor-pointer">
            <Modify id={id} />
            </MenubarItem> */}
            <MenubarItem onClick={handleDelete} className=" cursor-pointer">
             <p> Delete </p><Trash2 className="w-4 h-4 ml-auto" />
            </MenubarItem>
           
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
     );
}
 
export default MenuTrigger;