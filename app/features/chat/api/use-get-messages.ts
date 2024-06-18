import { client } from "@/lib/hono"
import { useQuery } from "@tanstack/react-query"


export const useGetMessages = ({
    server_id,
    channel_id
}: {
    server_id: string,
    channel_id: string
}) => {
    const query = useQuery({
        queryKey: ["messages", `serverId: ${server_id}`, `channelId: ${channel_id}`],
        queryFn: async () => {
            const response = await client.api.message[':server_id']['channel'][':channel_id']['message']['$get']({
                param: {
                    server_id,
                    channel_id
                }
            })
            if (!response.ok) {
                throw new Error("An error occurred while fetching messages")
            }
            return await response.json()
        }
    })
    return query;
}