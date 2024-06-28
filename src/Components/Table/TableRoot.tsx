import React from "react"


interface TableRootProps {
    children: React.ReactNode
}

export const TableRoot = ({ children }: TableRootProps) => {
    return (
        <div className="flex flex-col w-full">
            <div className="w-full sm:-mx-6 lg:-mx-8">
                <div className="inline-block w-full py-2 sm:px-6 lg:px-8">
                    <div className="overflow-x-auto">
                        <table className="min-w-full text-sm font-light text-left">
                            {children}
                        </table>
                    </div>
                </div>
            </div>
        </div>

    )
}