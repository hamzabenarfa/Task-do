"use client";
import { useState } from "react";

import { Input } from "@/components/ui/input";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";

import { Spinner } from "@/components/spinner";

import taskService from "@/service/task.service";

const formSchema = z.object({
    task: z.string(),
    
    context: z.string(),
    priority: z.number().min(1, {
        message: "number must not be empty.",
    }),

});

const Add = ({ title  }:{title:string}) => {

    const [task, setTask] = useState("");
    const [context, setContext] = useState("");
    const [priority, setPriority] = useState(0);

    const [loading, setLoading] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            task: "",
            context: "",
            priority: 0,
        },
    });

   
    

    return (
        <>
            <Drawer>
                <DrawerTrigger className="text-md capitalize font-semibold cursor-pointer">{title}</DrawerTrigger>
                <DrawerContent>
                    <DrawerHeader>
                        <DrawerTitle>
                            Add
                        </DrawerTitle>
                        <DrawerDescription>Add new task</DrawerDescription>

                    </DrawerHeader>
                    <Form {...form}>
                        <form className="p-4 space-y-4">
                            <FormField
                                control={form.control}
                                name="task"
                                render={(field) => (
                                    <FormItem>
                                        <FormLabel>Task</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Enter your task"
                                                {...field}
                                                onChange={(e) => setTask(e.target.value)}
                                                required
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                         
                                    <FormField
                                        control={form.control}
                                        name="priority"
                                        render={(field) => (
                                            <FormItem>
                                                <FormLabel>Priority</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="Enter your priority"
                                                        {...field}
                                                        onChange={(e) => setPriority(parseInt(e.target.value))}
                                                        required
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                             

                            <FormField
                                control={form.control}
                                name="context"
                                render={(field) => (
                                    <FormItem>
                                        <FormLabel>Context</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Enter your context"
                                                {...field}
                                                onChange={(e) => setContext(e.target.value)}
                                                required
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />


                            {loading ? (<DrawerFooter>
                                <div className="text-5xl font-bold flex items-center justify-center">
                                    <Spinner size="lg" />
                                </div></DrawerFooter>
                            ) : (<DrawerFooter>
                                <Button type="submit" className="w-full ">
                                    Submit
                                </Button></DrawerFooter>
                            )}
                        </form>
                    </Form>


                </DrawerContent>
            </Drawer>


        </>
    );
};

export default Add;