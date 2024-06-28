


export const SidebarRoot = ({children}: { children: React.ReactNode}) => {
    
    return (
        <aside className="flex flex-col justify-between w-16 h-full bg-textVar">
            {children}
        </aside>
    )
}