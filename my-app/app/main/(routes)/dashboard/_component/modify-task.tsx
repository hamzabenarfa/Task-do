"use client";
import { useEffect, useState } from "react";

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
    duration: z.number().min(1, {
        message: "number must not be empty.",
    }),
    context: z.string(),
    priority: z.number().min(1, {
        message: "number must not be empty.",
    }),
    start_at: z.string(),

});

const Modify = ({ id, title, appointment,data }:any) => {

    const [task, setTask] = useState(title);
    const [duration, setDuration] = useState(data.duration);
    const [context, setContext] = useState(data.context);
    const [priority, setPriority] = useState(data.priority);
    const [start_at, setStart_at] = useState("");


    const [loading, setLoading] = useState(false);
    const [enabled, setEnabled] = useState(appointment);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            task: "",
            duration: 0,
            context: "",
            priority: 0,
            start_at: "",
        },
    });
   
    const handleUpdate = async () => {
        const result = await taskService.updateTask(id, { task, duration, context, priority, start_at });
        if (result.data) {
            console.log("Task updated");
        } else if (result.error) {
            console.error("Error updating task:", result.error);
        }
    };

    return (
        <>
            <Drawer>
                <DrawerTrigger className="text- capitalize font-semibold cursor-pointer">{title}</DrawerTrigger>
                <DrawerContent>
                    <DrawerHeader>
                        <DrawerTitle>
                            Modify
                        </DrawerTitle>
                        <DrawerDescription>Modify your {enabled ? "appointment" : "task"}</DrawerDescription>

                    </DrawerHeader>
                    <Form {...form}>
                        <form onSubmit={handleUpdate} className="p-4 space-y-4">
                            <FormField
                                control={form.control}
                                name="task"
                                render={(field) => (
                                    <FormItem>
                                        <FormLabel>Task</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Enter your task"
                                                value={task}
                                                {...field}
                                                onChange={(e) => setTask(e.target.value)}
                                                required
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            {
                                enabled ? (
                                    <FormField
                                        control={form.control}
                                        name="start_at"
                                        render={(field) => (
                                            <FormItem>
                                                <FormLabel>Start At</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="Enter your start time"
                                                        value={start_at}
                                                        {...field}
                                                        onChange={(e) => setStart_at(e.target.value)}
                                                        
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                ) : (
                                    <FormField
                                        control={form.control}
                                        name="priority"
                                        render={(field) => (
                                            <FormItem>
                                                <FormLabel>Priority</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="Enter your priority"
                                                        value={priority}
                                                        {...field}
                                                        onChange={(e) => setPriority(parseInt(e.target.value))}
                                                        
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                )
                            }
                            <FormField
                                control={form.control}
                                name="duration"
                                render={(field) => (
                                    <FormItem>
                                        <FormLabel>Duration</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Enter your duration"
                                                value={duration}
                                                {...field}
                                                onChange={(e) => setDuration(parseInt(e.target.value))}
                                                
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
                                                value={context}
                                                {...field}
                                                onChange={(e) => setContext(e.target.value)}
                                                
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

export default Modify;