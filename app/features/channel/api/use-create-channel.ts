import { client } from "@/lib/hono"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { InferRequestType, InferResponseType } from "hono"
import { toast } from "sonner";

type RequestType = InferRequestType<typeof client.api.channel[':id']['create']['$post']>['json'];
type ResponseType = InferResponseType<typeof client.api.channel[':id']['create']['$post']>;

export const useCreateChannel = (id?: string) => {

    const queryClient = useQueryClient();
    const mutation = useMutation<
        ResponseType,
        Error,
        RequestType
    >({

        mutationFn: async (json) => {
            const response = await client.api.channel[":id"].create.$post({
                json,
                param: { id }
            });
            return await response.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["channels", `serverId: ${id}`] });
            toast.success("Channel created successfully");
        }
    });
    return mutation;

}