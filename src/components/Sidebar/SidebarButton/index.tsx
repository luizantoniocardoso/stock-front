
import { Bars3Icon, XMarkIcon } from "@heroicons/react/20/solid";
import { IconButton } from "@material-tailwind/react";

interface SidebarIconButtonProps {
    openDrawer: () => void;
    isDrawerOpen: boolean;
}


export const SidebarIconButton = ({openDrawer, isDrawerOpen} : SidebarIconButtonProps) => {
    return (
       <>
        <IconButton variant="text" size="lg" onClick={openDrawer} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
            {isDrawerOpen ? <XMarkIcon className="w-8 h-8 stroke-2" />  :  <Bars3Icon className="w-8 h-8 stroke-2" /> }
        </IconButton>
       
       </>
    )
}