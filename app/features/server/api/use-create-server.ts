import { client } from "@/lib/hono";
import { useMutation, useQueryClient } from "@tanstack/react-query"
import {
    InferRequestType,
    InferResponseType
} from "hono"
import { toast } from "sonner"

type RequestType = InferRequestType<typeof client.api.server.$post>['json'];
type ResponseType = InferResponseType<typeof client.api.server.$post>;

export const useCreateServer = () => {
    const queryClient = useQueryClient();
    const mutation = useMutation<
        ResponseType,
        Error,
        RequestType
    >({
        mutationFn: async (json) => {
            const response = await client.api.server.$post({ json });
            return await response.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["server"] });
            toast.success("Server created successfully");
        },
        onError: (error) => {
            console.error("Failed to create server:", error);
        }
    });
    return mutation;
}