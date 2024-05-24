import { Sidebar } from "@/components/Sidebar";
import { SidebarIconButton } from "@/components/Sidebar/SidebarButton";
import { ShoppingBagIcon } from "@heroicons/react/24/solid";
import { useState } from "react";

interface MainLayoutProps {
    children: React.ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
    const [open, setOpen] = useState(0);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    
    const handleOpen = (value: number) => setOpen(open === value ? 0 : value);
    const openDrawer = () => setIsDrawerOpen(true);
    const closeDrawer = () => setIsDrawerOpen(false);

    return (
        <div className="flex h-screen">
            <SidebarIconButton openDrawer={openDrawer} isDrawerOpen={isDrawerOpen} />

            <Sidebar.Root isDrawerOpen={isDrawerOpen} closeDrawer={closeDrawer}>
                <Sidebar.Header title="StockFront" img='img/1.png'/>
                <Sidebar.Divider />
                <Sidebar.Accordion open={open} handleOpen={handleOpen} title="Dashboard" icon={<ShoppingBagIcon className="w-5 h-5" />} openId={1}>
                    <Sidebar.Item>adwdawd</Sidebar.Item>
                    <Sidebar.Item>adwdawd</Sidebar.Item>
                    <Sidebar.Item>adwdawd</Sidebar.Item>
                    <Sidebar.Item>adwdawd</Sidebar.Item>
                </Sidebar.Accordion>
                <Sidebar.Accordion open={open} handleOpen={handleOpen} title="Dashboard" icon={<ShoppingBagIcon className="w-5 h-5" />} openId={2}>
                    <Sidebar.Item>adwdawd</Sidebar.Item>
                    <Sidebar.Item>adwdawd</Sidebar.Item>
                    <Sidebar.Item>adwdawd</Sidebar.Item>
                    <Sidebar.Item>adwdawd</Sidebar.Item>
                </Sidebar.Accordion>
                <Sidebar.Item>adwdawd</Sidebar.Item>
                <Sidebar.Item>adwdawd</Sidebar.Item>
                <Sidebar.Item>adwdawd</Sidebar.Item>
                <Sidebar.Item>adwdawd</Sidebar.Item>
            </Sidebar.Root>
            <div className="w-full h-full">
                {children}
            </div>

        </div>
    )
}