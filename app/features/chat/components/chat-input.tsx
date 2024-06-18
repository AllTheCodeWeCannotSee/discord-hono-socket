
"use client";
import { Input } from "@/components/ui/input"
import { Gift, Plus, Smile } from "lucide-react"
import { useCreateMessage } from "../api/use-create-message";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { useSocket } from "@/providers/socket-provider";
import { toast } from "sonner";



type Props = {
    channelId: string;
    serverId: string;
}

const formSchema = z.object({
    content: z.string().min(1)
})

export const ChatInput = ({
    channelId,
    serverId
}: Props) => {

    const { socket } = useSocket()
    const mutation = useCreateMessage({
        server_id: serverId,
        channel_id: channelId
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            content: ""
        }
    })

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        mutation.mutate(values, {
            onSuccess: () => {
                form.reset();
            }
        })
    }




    return (

        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                    control={form.control}
                    name="content"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <div className="bg-neutral-800/70 h-16 flex flex-col px-4 ">
                                    <div className="bg-neutral-700  h-12 flex items-center px-4 rounded-lg">
                                        <div className="bg-zinc-300/80 text-neutral-700 mr-2 rounded-full">
                                            <Plus
                                                className="w-5 h-5"

                                            />
                                        </div>
                                        <Input
                                            className="bg-neutral-700 border-none border-0 text-zinc-300 mr-2  focus-visible:ring-0 focus-visible:ring-offset-0"
                                            disabled={mutation.isPending}
                                            {...field}
                                        />
                                        <div className="flex items-center gap-x-2">
                                            <Gift className="w-5 h-5  text-zinc-300/80 bg-transparent" />
                                            <Smile className="w-5 h-5  text-zinc-300/80 bg-transparent" />
                                        </div>
                                    </div>
                                </div>
                            </FormControl>
                        </FormItem>
                    )}
                />
            </form>
        </Form>
        // <div className="bg-neutral-800/70 h-16 flex flex-col px-4 ">
        //     <div className="bg-neutral-700  h-12 flex items-center px-4 rounded-lg">
        //         <div className="bg-zinc-300/80 text-neutral-700 mr-2 rounded-full">
        //             <Plus className="w-5 h-5"  />
        //         </div>
        //         <Input 
        //         className="bg-neutral-700 border-none border-0 text-zinc-300 mr-2  focus-visible:ring-0 focus-visible:ring-offset-0" 
        //         />
        //         <div className="flex items-center gap-x-2">
        //             <Gift className="w-5 h-5  text-zinc-300/80 bg-transparent" />
        //             <Smile className="w-5 h-5  text-zinc-300/80 bg-transparent" />

        //         </div>
        //     </div>
        // </div>
    )
}