"use client";
import { useEffect, useState } from "react";
import { Clock2 } from "lucide-react";
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
import { useForm, SubmitHandler } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/spinner";
import axios from "axios";
import TimePicker from 'react-time-picker';
import 'react-time-picker/dist/TimePicker.css';
import 'react-clock/dist/Clock.css';
const formSchema = z.object({
    startingTime: z.string(),
    endingTime: z.string()
});
type FormSchema = z.infer<typeof formSchema>;


interface OperationalHoursData {
    id: string;
    startingTime: string;
    endingTime: string;
}

const OperationalHours = () => {
    const [startingTime, setStartingTime] = useState<string | null>(null);
    const [endingTime, setEndingTime] = useState<string | null>(null);
    const [operationalHours, setOperationalHours] = useState<OperationalHoursData | null>(null);
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            startingTime: "",
            endingTime: "",
        },
    });
    const token = localStorage.getItem("accessToken");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const url = operationalHours
                ? `http://localhost:4000/operationalhours/update/${operationalHours.id}`
                : "http://localhost:4000/operationalhours/create";
            const method = operationalHours ? "put" : "post";

            setLoading(true);
            const res = await axios[method](
                url,
                {
                    startingTime,
                    endingTime
                },
                {
                    headers: {
                        Authorization: 'Bearer ' + token,
                    },
                });
            if (res) {
                setLoading(false);
                setOpen(false);
                window.location.reload();
            } else {
                setLoading(false);
            }
        } catch (err) {
            console.log(err);
            setLoading(false);
        }
    };

    useEffect(() => {
        const fetchOperationalHours = async () => {
            try {
                const response = await axios.get("http://localhost:4000/operationalhours/get", {
                    headers: {
                        Authorization: 'Bearer ' + token,
                    },
                });
                if (response) {
                    setOperationalHours(response.data);
                } else {
                    console.log("no data");
                }
            } catch (error) {
                console.error("Fetching data failed:", error);
            }
        };
        fetchOperationalHours();
    }, [token]);

    return (
        <>
            <Dialog open={open} onOpenChange={setOpen} >
                <DialogTrigger asChild>
                    {operationalHours ?
                        (<div className="h-10 bg-gray-100 rounded-3xl flex justify-center items-center cursor-pointer">
                            <div className="flex flex-row items-center justify-center gap-1 px-4">
                                <p>{operationalHours.startingTime}</p>-
                                <p>{operationalHours.endingTime}</p>
                            </div>
                        </div>) :
                        (<div className="w-10 h-10 bg-gray-100 rounded-3xl flex justify-center items-center cursor-pointer">
                            <Clock2 size={20} className="text-gray-400" />
                        </div>)
                    }
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Operational hours</DialogTitle>
                        <DialogDescription className="flex flex-col items-center justify-center gap-1">
                            Click on the save to enable the operational hours
                        </DialogDescription>
                    </DialogHeader>
                    <div>
                        <Form {...form}>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <FormField
                                    control={form.control}
                                    name="startingTime"
                                    render={() => (
                                        <FormItem>
                                            <FormLabel>Starting Time</FormLabel>
                                            <FormControl>
                                                <TimePicker
                                                    onChange={setStartingTime}
                                                    value={startingTime}
                                                    disableClock={true}
                                                    className="w-full border border-gray-300 rounded-md py-2 px-3"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="endingTime"
                                    render={() => (
                                        <FormItem>
                                            <FormLabel>Ending Time</FormLabel>
                                            <FormControl>
                                                <TimePicker
                                                    onChange={setEndingTime}
                                                    value={endingTime}
                                                    disableClock={true}
                                                    className="w-full border border-gray-300 rounded-md py-2 px-3"
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
