import { client } from "@/lib/hono"
import { useQuery } from "@tanstack/react-query"

export const useGetChannels = (serverId: string) => {
    const query = useQuery({
        queryKey: ["channels", `serverId: ${serverId}`],
        queryFn: async () => {
            const response = await client.api.channel[":id"].$get({
                param: { id: serverId },
            })

            if (!response.ok) {
                throw new Error("An error occurred while fetching channels")
            }

            const { channelData } = await response.json();
            return channelData;
        }
    });
    return query;
}