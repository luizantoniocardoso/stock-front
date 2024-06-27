import React from "react"


interface TableBodyProps {
    children: React.ReactNode
}

export const TableBody = ({ children }:TableBodyProps) => {
    return (
        <tbody>
            {children}
        </tbody>
    )
}