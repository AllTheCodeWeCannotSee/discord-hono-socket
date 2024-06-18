import { client } from "@/lib/hono"
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono"
import { toast } from "sonner";


type ResponseType = InferResponseType<typeof client.api.server.join.$post>;
type RequestType = InferRequestType<typeof client.api.server.join.$post>['json'];

export const useUpdateServerMember = () => {
    const queryClient = useQueryClient();
    const mutation = useMutation<
        ResponseType,
        Error,
        RequestType
    >({
        mutationFn: async (json) => {
            console.log(json);
            const response = await client.api.server.join.$post({
                json,
            });
            return await response.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["server"] });
            toast.success("Join server successfully");
        },
        onError: (error) => {
            console.error("Failed to join server:", error);
        }

    });
    return mutation;

}