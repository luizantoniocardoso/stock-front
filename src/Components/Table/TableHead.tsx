import React from "react"

interface TableHeadProps {
    children: React.ReactNode
}

export const TableHead = ({children}: TableHeadProps) => {

    return (
        <thead className="font-medium border-b dark:border-neutral-500">
            {children}
        </thead>
    )
}