import { client } from "@/lib/hono";
import { useQuery } from "@tanstack/react-query";


export const useGetServerWithMemberRole = (id?: string) => {
    const query = useQuery({
        queryKey: ["server", "role", `${id}`],
        queryFn: async () => {
            const response = await client.api.server[':id']['role'].$get({
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