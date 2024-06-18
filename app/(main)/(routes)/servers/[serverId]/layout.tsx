import { ServerSidebar } from "@/app/features/channel/components/server-sidebar";

type ServerIdLayoutProps = {
    children: React.ReactNode;
    params: { serverId: string; };
}

const ServerIdLayout = ({
    children,
    params,
}: ServerIdLayoutProps) => {
    return (
        <div className="bg-neutral-700 h-full w-full flex ">
            <ServerSidebar serverId={params.serverId} />
            {children}
        </div>
    )

}

export default ServerIdLayout;
