import { Typography } from "@material-tailwind/react"

interface SidebarHeaderProps {
    title: string;
    img: string;
}

export const SidebarHeader = ({img, title}: SidebarHeaderProps) => {

    return (
        <div className="flex items-center gap-4 p-4 mb-2">
        <img src={img} alt="brand" className="w-8 h-8" />
        <Typography variant="h5" color="blue-gray" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
            {title}
        </Typography>
      </div>
    )
}