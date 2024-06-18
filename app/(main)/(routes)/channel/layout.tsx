


type Props = {
    children: React.ReactNode;
}

const ChannelLayout = ({ children }: Props) => {
    return (
        <div className="bg-neutral-700 h-full w-full flex ">

            {children}
        </div>
    )
}

export default ChannelLayout;