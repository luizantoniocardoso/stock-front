import React from "react"

interface TableLineProps {
    children: React.ReactNode
}

export const TableLine = ({ children }: TableLineProps) => {
    return (
        <tr >
           {children}
        </tr>
    )
}