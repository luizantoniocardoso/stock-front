import React from "react"

interface TableItemProps {
    children: React.ReactNode;
    collSpan?: number;
    aling?: 'center' | 'left' | 'right'
}

export const TableItem = ({ children, collSpan, aling }: TableItemProps) => {
    return (
        <th scope="col" className={`px-6 py-4 text-${aling}`}colSpan={collSpan} >
            {children}
        </th>
    )
}
