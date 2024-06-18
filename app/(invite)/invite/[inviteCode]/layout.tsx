
type InviteLayoutProps = {
    children: React.ReactNode;
}

const InviteLayout = ({ children }: InviteLayoutProps) => {
    return (
        <div className="flex h-full items-center justify-center bg-neutral-800">
            {children}
        </div>
    )
}

export default InviteLayout;