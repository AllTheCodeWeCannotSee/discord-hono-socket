import { Sidebar } from "../features/server/components/sidebar";


type Props = {
    children: React.ReactNode;
}

const MainLayout = ({ children }: Props) => {
    return (
        <div className=" h-full flex ">
            <Sidebar />
            {children}
        </div>
    )
}

export default MainLayout;