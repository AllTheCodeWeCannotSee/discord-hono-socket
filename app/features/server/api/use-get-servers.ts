import { client } from "@/lib/hono";
import { useQuery } from "@tanstack/react-query";


export const useGetServers = () => {
    const query = useQuery({
        queryKey: ["server", "server-list"],
        queryFn: async () => {
            const response = await client.api.server.$get();

            if (!response.ok) {
                throw new Error(response.statusText);
            }

            const { serverData } = await response.json();
            return serverData;
        },
    });
    return query;
}