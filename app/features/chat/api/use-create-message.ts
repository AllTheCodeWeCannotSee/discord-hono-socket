import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import qs from "query-string"
import { toast } from "sonner";



export const useCreateMessage = ({
    server_id,
    channel_id
}: {
    server_id: string,
    channel_id: string
}) => {
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: async (json: { content: string }) => {
            const query = {
                server_id,
                channel_id
            }
            const url = qs.stringifyUrl({
                url: "/api/socket/messages",
                query
            })
            const response = await axios.post(url, json);
            if (response.status !== 200) {
                throw new Error("An error occurred while creating message")
            }
            return response.data;
        },
        onSuccess: () => {
            toast.success("Message sent successfully");
            queryClient.invalidateQueries({ queryKey: ["messages", `serverId: ${server_id}`, `channelId: ${channel_id}`] });
        }
    })
    return mutation;

}

// import { client } from "@/lib/hono";
// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { InferRequestType, InferResponseType } from "hono";
// import { toast } from "sonner";


// type RequestType = InferRequestType<typeof client.api.message[':server_id']['channel'][':channel_id']['message']['$post']>['json']
// type ResponseType = InferResponseType<typeof client.api.message[':server_id']['channel'][':channel_id']['message']['$post']>
// export const useCreateMessage = ({
//     server_id,
//     channel_id
// }: {
//     server_id: string,
//     channel_id: string
// }) => {
//     const queryClient = useQueryClient();
//     const mutation = useMutation<
//         ResponseType,
//         Error,
//         RequestType
//     >({
//         mutationFn: async (json) => {
//             const response = await client.api.message[":server_id"].channel[":channel_id"].message.$post({
//                 json,
//                 param: {
//                     server_id,
//                     channel_id
//                 }
//             });
//             if (!response.ok) {
//                 throw new Error("An error occurred while creating message")
//             }

//             return await response.json();
//         },
//         onSuccess: () => {
//             toast.success("Message sent successfully");
//             queryClient.invalidateQueries({ queryKey: ["messages", `serverId: ${server_id}`, `channelId: ${channel_id}`] });
//         }
//     });

//     return mutation;
// }