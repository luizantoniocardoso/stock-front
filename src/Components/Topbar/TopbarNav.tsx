interface TopbarNavProps {
    children?: React.ReactNode;
}

export const TopbarNav = ( { children }: TopbarNavProps) => {
    
        return (
            <nav className="flex items-center space-x-4 min-w-[33%] justify-center">
                {children}
            </nav>
        )
    }


