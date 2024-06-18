
import { client } from "@/lib/hono";
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { InferRequestType, InferResponseType } from "hono"
import { toast } from "sonner";

type ResponseType = InferResponseType<typeof client.api.server[":id"]["invite"]["$patch"]>;
type RequestType = InferRequestType<typeof client.api.server[":id"]["invite"]["$patch"]>['param']

export const useUpdateInvite = (id?: string) => {
    const queryClient = useQueryClient();

    const mutation = useMutation<
        ResponseType,
        Error
    >({
        mutationFn: async () => {
            const response = await client.api.server[":id"]["invite"]["$patch"]({ param: { id } });
            return await response.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["server"] });
            toast.success("Invite code updated successfully");
        }
    });

    return mutation;
}