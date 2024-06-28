import React from "react"

interface TableItemProps {
    children: React.ReactNode;
    collSpan?: number;
}

export const TableItem = ({ children, collSpan }: TableItemProps) => {
    return (
        <th scope="col" className="px-6 py-4" colSpan={collSpan}>
            {children}
        </th>
    )
}
