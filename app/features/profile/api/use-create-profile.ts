import { useMutation, useQueryClient } from "@tanstack/react-query"
import { InferRequestType, InferResponseType } from "hono"

import { client } from "@/lib/hono"


type RequestType = InferRequestType<typeof client.api.profile.$post>['json'];
type ResponseType = InferResponseType<typeof client.api.profile.$post>;

export const useCreateProfile = () => {
    const queryClient = useQueryClient();
    const mutation = useMutation<
        ResponseType,
        Error,
        RequestType
    >({
        mutationFn: async (json) => {
            const response = await client.api.profile.$post({ json });
            return await response.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["profile"] });
        },
        onError: (error) => {
            console.error("Failed to create profile:", error);

        }
    });
    return mutation;
}