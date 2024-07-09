import React from "react"



interface TableFooterProps {
    children?: React.ReactNode
}

export const TableFooter = ({ children }:TableFooterProps) => {
    return (
        <tfoot className="font-medium border-t dark:border-neutral-500">
            {children}
        </tfoot>
    )
}