import { useNavigate } from "react-router-dom";
import { TETooltip } from "tw-elements-react"



interface SidebarItemProps {
    children: React.ReactNode;
    to: string;
    description?: string;
}

export const SidebarItem = ({children, to, description}: SidebarItemProps) => {
    const navigate = useNavigate();

    return (
        <TETooltip
        tag="button"
        title={description}
        className="flex items-center justify-center w-full h-auto py-5 text-left cursor-pointer text-contrastVar-600 hover:bg-backgroundVar-CONTRA focus:outline-none focus:bg-backgroundVar-CONTRA"
        >
            <button 
                aria-current="true" 
                type="button"
                className="w-full h-full"
                onClick={() => navigate(to)}
            >
              {children}
          </button>
        </TETooltip>
    )
}