import { client } from "@/lib/hono";
import { useQuery } from "@tanstack/react-query";

export const useGetServerWithChannelsMembers = (id?: string) => {
    const query = useQuery({
        queryKey: ["server"],
        queryFn: async () => {
            const response = await client.api.server[':id'].$get({
                param: { id }
            });

            if (!response.ok) {
                throw new Error(response.statusText);
            }

            const data = await response.json();
            return data;
        },
    });
    return query;
}