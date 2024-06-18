"use client";

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"


import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useCreateChannelStore } from "../hooks/use-create-channel-store";
import { useCreateChannel } from "../../channel/api/use-create-channel";
import { useParams } from "next/navigation";


const formSchema = z.object({
    name: z.string(),
    type: z.enum(["TEXT", "AUDIO", "VIDEO"])
})

export const CreateChannelModal = () => {
    const { isOpen, onOpen, onClose, serverId } = useCreateChannelStore();


    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            type: "TEXT",
        }
    })
    const mutation = useCreateChannel(serverId);

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        console.log(values);
        mutation.mutate(values, {
            onSuccess: () => {
                onClose();
            }
        });
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>

            <DialogContent className="bg-neutral-800 text-zinc-400 border-0">
                <DialogHeader>
                    <DialogTitle className="text-zinc-300">创建您的Channel</DialogTitle>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Channel名称</FormLabel>
                                    <FormControl>

                                        <Input
                                            className="bg-neutral-900 border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                                            disabled={mutation.isPending}
                                            placeholder="您的Channel" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>

                            )}
                        />
                        <FormField
                            control={form.control}
                            name="type"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Channel类型</FormLabel>


                                    <Select
                                        disabled={mutation.isPending}
                                        onValueChange={field.onChange}
                                        value={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger
                                                className="bg-neutral-900 border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                                            >
                                                <SelectValue placeholder="选择您的Channel类型" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent className="focus-visible:ring-offset-0  focus-visible:ring-0">
                                            <SelectGroup>
                                                <SelectItem value="TEXT">TEXT</SelectItem>
                                                <SelectItem value="AUDIO">AUDIO</SelectItem>
                                                <SelectItem value="VIDEO">VIDEO</SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>

                                    <FormMessage />
                                </FormItem>

                            )}
                        />
                        <DialogFooter>
                            <Button
                                className="bg-indigo-500 text-zinc-100 px-10"
                                type="submit"
                                disabled={mutation.isPending}
                            >
                                创建
                            </Button>
                        </DialogFooter>
                    </form>

                </Form>

            </DialogContent>
        </Dialog>
    )
}



