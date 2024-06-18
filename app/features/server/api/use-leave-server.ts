import { client } from "@/lib/hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";

type ResponseType = InferResponseType<typeof client.api.server[':id']['leave']['$patch']>;
type RequestType = InferRequestType<typeof client.api.server[':id']['leave']['$patch']>['param'];

export const useLeaveServer = (id?: string) => {
    const queryClient = useQueryClient();
    const mutation = useMutation<
        ResponseType,
        Error
    >({
        mutationFn: async () => {
            const response = await client.api.server[":id"]['leave']['$patch']({
                param: { id },
            });
            return await response.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["server"] });
            toast.success("Leave server successfully");
        },
        onError: (error) => {
            console.error("Failed to leave server:", error);
        }

    });
    return mutation;
}