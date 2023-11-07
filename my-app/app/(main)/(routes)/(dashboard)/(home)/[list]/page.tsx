"use client"
import Header  from "../../_components/header";
import Menu from "../../_components/menu"; 
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface DynamicListProps {
    params: number;
}

const DynamicList = ({params}:DynamicListProps) => {
    return ( 
        <div>
        <Header title="Personal"/>
        <main className="p-6">
        <RadioGroup defaultValue="option-one">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="option-one" id="option-one" />
            <Label htmlFor="option-one" className="font-light">List1</Label>
          </div>
        </RadioGroup>
      </main>
      <Menu updateData={()=>{return;}}/>

      </div>
     );
}
 
export default DynamicList;