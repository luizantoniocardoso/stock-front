import React from "react"


interface TableBodyProps {
    children: React.ReactNode
}

export const TableBody = ({ children }:TableBodyProps) => {
    return (
        <tbody className="max-h-[50rem]">
            {children}
        </tbody>
    )
}