"use client";
import { useState } from "react";

import { Clock2, PlusCircle } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";

import { Spinner } from "@/components/spinner";

import axios from "axios";

const formSchema = z.object({
    startingTime: z.string(),
    endingTime: z.string()
 

});

const OperationalHours = () => {

    const [startingTime, setStartingTime] = useState("");
    const [endingTime, setEndingTime] = useState("");
    
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
  
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            startingTime: "",
            endingTime: "",
      
        },
    });
    //localhost:4000/operationalhours/create

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try{
            setLoading(true)
            const res = await axios.post("http://localhost:4000/operationalhours/create",{
                startingTime,
                endingTime
          

            });
            if (res) {
                setLoading(false);
                setOpen(false);
              } else {
                setLoading(false);
              }
        }catch(err){
            console.log(err)
        }
    }    


    return (
        <>
            <Dialog open={open} onOpenChange={setOpen} >
                <DialogTrigger asChild>
                        <Clock2 size={24} className="text-gray-400" />
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Operational hours</DialogTitle>
                        <DialogDescription className="flex flex-col items-center justify-center gap-1">
                            click on the save to enable the operational hours
                          
                        </DialogDescription>
                    </DialogHeader>
                    <div>

                        <Form {...form}>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <FormField
                                    control={form.control}
                                    name="startingTime"
                                    render={(field) => (
                                        <FormItem>
                                            <FormLabel>Starting Time</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Enter your starting time"
                                                    {...field}
                                                    onChange={(e) => setStartingTime(e.target.value)}
                                                    required
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                
                                <FormField
                                    control={form.control}
                                    name="endingTime"
                                    render={(field) => (
                                        <FormItem>
                                            <FormLabel>Ending Time</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Enter your ending time"
                                                    {...field}
                                                    onChange={(e) => setEndingTime(e.target.value)}
                                                    required
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />


                                {loading ? (
                                    <div className="text-5xl font-bold flex items-center justify-center">
                                        <Spinner size="lg" />
                                    </div>
                                ) : (
                                    <Button type="submit" className="w-full">
                                        Submit
                                    </Button>
                                )}
                            </form>
                        </Form>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default OperationalHours;