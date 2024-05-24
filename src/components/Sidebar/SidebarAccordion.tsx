import { ChevronDownIcon } from "@heroicons/react/24/solid"
import { Accordion, AccordionBody, AccordionHeader, ListItem, ListItemPrefix, Typography } from "@material-tailwind/react"
import { ForwardRefExoticComponent, SVGProps } from "react";

interface SidebarAccordionProps {
    children: any;
    open: number;
    handleOpen: (value: number) => void;
    title: string;
    icon: any;
    openId: number;
}

export const SidebarAccordion = ({children, open, handleOpen, title, icon, openId}: SidebarAccordionProps) => {
    return(
        <Accordion open={open === openId} icon={<ChevronDownIcon strokeWidth={2.5} className={`mx-auto h-4 w-4 transition-transform ${open === openId ? "rotate-180" : ""}`} />}  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
            <ListItem className="p-0" selected={open === openId}  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                <AccordionHeader onClick={() => handleOpen(openId)} className="p-3 border-b-0"  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                    <ListItemPrefix  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                        {icon}
                    </ListItemPrefix>
                    <Typography color="blue-gray" className="mr-auto font-normal"  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                        {title}
                    </Typography>
                </AccordionHeader>
            </ListItem>
            <AccordionBody className="py-1">
                {children}
            </AccordionBody>
        </Accordion>
    )
}