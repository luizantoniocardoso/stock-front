import { Card, Drawer, List } from "@material-tailwind/react"

interface SidebarRootProps {
    closeDrawer: () => void;
    isDrawerOpen: boolean;
    children: React.ReactNode;
}

export const SidebarRoot = ({ children, isDrawerOpen, closeDrawer }: SidebarRootProps) => {
    return(
        <Drawer open={isDrawerOpen} onClose={closeDrawer}  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
        <Card color="transparent" shadow={false} className="h-[calc(100vh-2rem)] w-full p-4"  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} >
          <List  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
            {children}	
          </List>
        </Card>
      </Drawer>
    )
}