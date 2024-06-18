import { client } from "@/lib/hono"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { InferRequestType, InferResponseType } from "hono"
import { toast } from "sonner";

type ResponseType = InferResponseType<typeof client.api.server[":id"]["$delete"]>;


export const useDeleteServer = (id?: string) => {
    const queryClient = useQueryClient();
    const mutation = useMutation<
        ResponseType,
        Error

    >({
        mutationFn: async () => {
            const response = await client.api.server[":id"]["$delete"]({
                param: { id }
            });
            return await response.json();
        },

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["server"] });
            toast.success("Server deleted successfully");
        }

    });
    return mutation;
}