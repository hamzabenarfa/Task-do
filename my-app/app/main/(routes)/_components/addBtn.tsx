"use client";
import { useState } from "react";

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
import { set, useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";

import { Spinner } from "@/components/spinner";
import MyToggle from "./toggle";

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

const AddBtn = () => {

    const [task, setTask] = useState("");
    const [duration, setDuration] = useState(0);
    const [context, setContext] = useState("");
    const [priority, setPriority] = useState(0);
    const [start_at, setStart_at] = useState("");

    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [enabled, setEnabled] = useState(false);

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
  
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // Start loading
        try {
        const result = await taskService.createTask(task, duration, context, priority, start_at, enabled);
      if (result.data) {
        console.log("Task created:", result.data);
        setOpen(false); 
    } else if (result.error) {
        console.error("Error creating task:", result.error);
      }
    } catch (error) {
      console.error("Unexpected error:", error);
    } finally {
      setLoading(false);  
    }
  };

 


    return (
        <>
            <Dialog open={open} onOpenChange={setOpen} >
                <DialogTrigger asChild>

                    <div className="w-10 h-10 bg-gray-100 rounded-3xl flex justify-center items-center cursor-pointer">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 text-gray-500"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                            />
                        </svg>
                    </div>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Add {enabled ? "appointment" : "task"}</DialogTitle>
                        <DialogDescription className="flex flex-col items-center justify-center gap-1">
                            click on the toggle to change the form
                            <MyToggle enabled={enabled} setEnabled={setEnabled} />
                        </DialogDescription>
                    </DialogHeader>
                    <div>

                        <Form {...form}>
                            <form onSubmit={handleSubmit} className="space-y-4">
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
                                                            {...field}
                                                            onChange={(e) => setStart_at(e.target.value)}
                                                            required
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
                                                            {...field}
                                                            onChange={(e) => setPriority(parseInt(e.target.value))}
                                                            required
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
                                                    {...field}
                                                    onChange={(e) => setDuration(parseInt(e.target.value))}
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

export default AddBtn;