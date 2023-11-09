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
        <div className="lg:mx-40 xl:mx-60 min-h-screen flex flex-col justify-between">
            <div className="">
            <Header title="Personal"/>
            <main className="p-6 space-y-4">
                <RadioGroup defaultValue="option-one">
                <div className="flex items-center space-x-2 bg-gray-100 p-4 rounded-2xl">
                    <RadioGroupItem value="option-one" id="option-one" />
                    <Label htmlFor="option-one" className="font-light ">List1</Label>
                </div>
                </RadioGroup>
                <RadioGroup defaultValue="option-one">
                <div className="flex items-center space-x-2 bg-gray-100 p-4 rounded-2xl">
                    <RadioGroupItem value="option-one" id="option-one" />
                    <Label htmlFor="option-one" className="font-light ">List1</Label>
                </div>
                </RadioGroup>
                <RadioGroup defaultValue="option-one">
                <div className="flex items-center space-x-2 bg-gray-100 p-4 rounded-2xl">
                    <RadioGroupItem value="option-one" id="option-one" />
                    <Label htmlFor="option-one" className="font-light ">List1</Label>
                </div>
                </RadioGroup>
            </main>
            
            </div>
            
            <Menu updateData={()=>{return;}}/>
            
         </div>
     );
}
 
export default DynamicList;