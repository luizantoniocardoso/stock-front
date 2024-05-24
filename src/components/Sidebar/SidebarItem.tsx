import { PowerIcon } from "@heroicons/react/24/solid"
import { ListItem, ListItemPrefix } from "@material-tailwind/react"

interface SidebarItemProps {
    children: string;
}

export const SidebarItem = ({children} : SidebarItemProps) => {
    return(
        <ListItem  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
            <ListItemPrefix  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
            <PowerIcon className="w-5 h-5" />
            </ListItemPrefix>
            {children}
        </ListItem>
    )
}