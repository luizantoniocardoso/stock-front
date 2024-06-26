interface TopbarRootProps {
    children: React.ReactNode;
}

export const TopbarRoot = ({ children }: TopbarRootProps ) => {

    return (
        <header className="flex justify-between w-full h-16 shadow-xl bg-backgroundVar ">
            {children}
        </header>
    )
}