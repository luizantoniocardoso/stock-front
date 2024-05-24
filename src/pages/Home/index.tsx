import React from "react";
import {
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
  Accordion,
  AccordionHeader,
  AccordionBody,
  Alert,
  Drawer,
  Card,
} from "@material-tailwind/react";
import {
  PresentationChartBarIcon,
  ShoppingBagIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  InboxIcon,
  PowerIcon,
} from "@heroicons/react/24/solid";
import {
  ChevronRightIcon,
  ChevronDownIcon,
  CubeTransparentIcon,

} from "@heroicons/react/24/outline";
import { SidebarIconButton } from "@/components/Sidebar/SidebarButton";
 
export function Home() {
  const [open, setOpen] = React.useState(0);
  const [openAlert, setOpenAlert] = React.useState(true);
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
 
  const handleOpen = (value: number) => {
    setOpen(open === value ? 0 : value);
  };
 
  const openDrawer = () => setIsDrawerOpen(true);
  const closeDrawer = () => setIsDrawerOpen(false);
 
  return (
    <>
    <div className="w-full h-full">
    
      <SidebarIconButton openDrawer={openDrawer} isDrawerOpen={isDrawerOpen} />
      
      <Drawer open={isDrawerOpen} onClose={closeDrawer}>
        <Card color="transparent" shadow={false} className="h-[calc(100vh-2rem)] w-full p-4" >
          <div className="flex items-center gap-4 p-4 mb-2">
            <img src="https://docs.material-tailwind.com/img/logo-ct-dark.png" alt="brand" className="w-8 h-8" />
            <Typography variant="h5" color="blue-gray">
              Sidebar
            </Typography>
          </div>
          <List>
            <Accordion
              open={open === 1}
              icon={
                <ChevronDownIcon
                  strokeWidth={2.5}
                  className={`mx-auto h-4 w-4 transition-transform ${
                    open === 1 ? "rotate-180" : ""
                  }`}
                />
              }
            >
              <ListItem className="p-0" selected={open === 1}>
                <AccordionHeader
                  onClick={() => handleOpen(1)}
                  className="p-3 border-b-0"
                >
                  <ListItemPrefix>
                    <PresentationChartBarIcon className="w-5 h-5" />
                  </ListItemPrefix>
                  <Typography color="blue-gray" className="mr-auto font-normal">
                    Dashboard
                  </Typography>
                </AccordionHeader>
              </ListItem>
              <AccordionBody className="py-1">
                <List className="p-0">
                  <ListItem>
                    <ListItemPrefix>
                      <ChevronRightIcon strokeWidth={3} className="w-5 h-3" />
                    </ListItemPrefix>
                    Analytics
                  </ListItem>
                  <ListItem>
                    <ListItemPrefix>
                      <ChevronRightIcon strokeWidth={3} className="w-5 h-3" />
                    </ListItemPrefix>
                    Reporting
                  </ListItem>
                  <ListItem>
                    <ListItemPrefix>
                      <ChevronRightIcon strokeWidth={3} className="w-5 h-3" />
                    </ListItemPrefix>
                    Projects
                  </ListItem>
                </List>
              </AccordionBody>
            </Accordion>
            <Accordion
              open={open === 2}
              icon={
                <ChevronDownIcon
                  strokeWidth={2.5}
                  className={`mx-auto h-4 w-4 transition-transform ${
                    open === 2 ? "rotate-180" : ""
                  }`}
                />
              }
            >
              <ListItem className="p-0" selected={open === 2}>
                <AccordionHeader
                  onClick={() => handleOpen(2)}
                  className="p-3 border-b-0"
                >
                  <ListItemPrefix>
                    <ShoppingBagIcon className="w-5 h-5" />
                  </ListItemPrefix>
                  <Typography color="blue-gray" className="mr-auto font-normal">
                    E-Commerce
                  </Typography>
                </AccordionHeader>
              </ListItem>
              <AccordionBody className="py-1">
                <List className="p-0">
                  <ListItem>
                    <ListItemPrefix>
                      <ChevronRightIcon strokeWidth={3} className="w-5 h-3" />
                    </ListItemPrefix>
                    Orders
                  </ListItem>
                  <ListItem>
                    <ListItemPrefix>
                      <ChevronRightIcon strokeWidth={3} className="w-5 h-3" />
                    </ListItemPrefix>
                    Products
                  </ListItem>
                </List>
              </AccordionBody>
            </Accordion>
            <hr className="my-2 border-blue-gray-50" />
            <ListItem>
              <ListItemPrefix>
                <InboxIcon className="w-5 h-5" />
              </ListItemPrefix>
              Inbox
              <ListItemSuffix>
                <Chip value="14" size="sm" variant="ghost" color="blue-gray" className="rounded-full"/>
              </ListItemSuffix>
            </ListItem>
            <ListItem>
              <ListItemPrefix>
                <UserCircleIcon className="w-5 h-5" />
              </ListItemPrefix>
              Profile
            </ListItem>
            <ListItem>
              <ListItemPrefix>
                <Cog6ToothIcon className="w-5 h-5" />
              </ListItemPrefix>
              Settings
            </ListItem>
            <ListItem>
              <ListItemPrefix>
                <PowerIcon className="w-5 h-5" />
              </ListItemPrefix>
              Log Out
            </ListItem>
          </List>
        </Card>
      </Drawer>
    </div>
    </>
  );
}