import { client } from "@/lib/hono";
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { InferRequestType, InferResponseType } from "hono"
import { toast } from "sonner";

type ResponseType = InferResponseType<typeof client.api.server[":id"]["$patch"]>;
type RequestType = InferRequestType<typeof client.api.server[":id"]["$patch"]>["json"];


export const useUpdateServer = (id?: string) => {
    const queryClient = useQueryClient();

    const mutation = useMutation<
        ResponseType,
        Error,
        RequestType
    >({
        mutationFn: async (json) => {
            const response = await client.api.server[":id"]["$patch"]({
                json,
                param: { id },
            });
            return await response.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["server"] });
            toast.success("Server updated successfully");
        }
    });

    return mutation;
}