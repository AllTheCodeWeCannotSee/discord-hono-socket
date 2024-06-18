import { client } from "@/lib/hono";
import { useQuery } from "@tanstack/react-query"


export const useGetChannel = ({
    server_id,
    channel_id
}: {
    server_id: string;
    channel_id: string;
}) => {
    const query = useQuery({
        queryKey: ["channel", `channelId: ${channel_id}`],
        queryFn: async () => {
            const response = await client.api.channel[":server_id"].channel[":channel_id"].$get({
                param: {
                    server_id,
                    channel_id,
                },
            })

            if (!response.ok) {
                throw new Error("An error occurred while fetching channel")
            }

            const { channelData } = await response.json();
            return channelData;
        }
    });
    return query;
}