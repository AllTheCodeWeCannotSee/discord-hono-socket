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


import { Plus } from "lucide-react"
import { ActionButton } from "./action-button"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useCreateServer } from "../../server/api/use-create-server";
import { useCreateServerStore } from "../hooks/use-create-server-store";

const formSchema = z.object({
    name: z.string(),
    imageUrl: z.string(),
})

export const CreateServerModal = () => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            imageUrl: "",
        }
    })
    const mutation = useCreateServer();

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        mutation.mutate(values, {
            onSuccess: () => {
                onClose();
            }
        });
    };

    const { isOpen, onOpen, onClose } = useCreateServerStore();
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>

            <DialogContent className="bg-neutral-800 text-zinc-400 border-0">
                <DialogHeader>
                    <DialogTitle className="text-zinc-300">创建您的服务器</DialogTitle>
                    <DialogDescription className="text-zinc-500">
                        您的服务器是您和好友聚首的地方。创建自己的服务器，开始畅聊吧。
                    </DialogDescription>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>服务器名称</FormLabel>
                                    <FormControl>

                                        <Input
                                            className="bg-neutral-900 border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                                            disabled={mutation.isPending}
                                            placeholder="您的服务器" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>

                            )}
                        />
                        <FormField
                            control={form.control}
                            name="imageUrl"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>服务器图像</FormLabel>
                                    <FormControl>

                                        <Input
                                            className="bg-neutral-900 border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                                            disabled={mutation.isPending}
                                            placeholder="您的服务器图像" {...field} />
                                    </FormControl>
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



