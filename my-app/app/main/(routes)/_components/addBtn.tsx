"use client";
import { useState } from "react";


import { PlusCircle } from "lucide-react";
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
import MyToggle from "./toggle";

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

    const [open, setOpen] = useState(false);
    const [task, setTask] = useState("");
    const [duration, setDuration] = useState(0);
    const [loading, setLoading] = useState(false);

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

    /**
     * appointment :
     *  "task": "making ui",
        "priority": 3,     condition ----- send int 
        "duration": 120,
        "context": "dev"
     *  Task:
        "task": "Meeting Scrum ",
        "start_at": "9:00"  condition ----- send string
        "duration": 20,
        "context": "scrum",
     */

    const [enabled, setEnabled] = useState(false);
    console.log("🚀 ~ AddBtn ~ enabled:", enabled)


    return (
        <>
            <Dialog open={open} onOpenChange={setOpen} >
                <DialogTrigger asChild>
                    <button>
                        <PlusCircle size={28} className="text-blue-500 ml-2" />
                    </button>
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
                            <form className="space-y-4">
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
                                    !enabled ? (
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
                                                            onChange={(e) => setTask(e.target.value)}
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
                                                            onChange={(e) => setTask(e.target.value)}
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
                                                    onChange={(e) => setPlace(e.target.value)}
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
                                                    onChange={(e) => setDuration(parseInt(e.target.value))}
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