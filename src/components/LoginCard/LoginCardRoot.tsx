import { ReactNode } from "react";


interface LoginCardRootProps {
    children: ReactNode[];
}



export const LoginCardRoot = ({ children }: LoginCardRootProps ) => {
    return (
        <section className="h-screen">
            <div className="container flex items-center justify-center h-full px-6 py-24">
                <div className="flex flex-wrap items-center justify-center h-auto g-6 lg:justify-between bg-backgroundVar-CONTRA rounded-2xl" >
                    <div className="mb-12 md:mb-0 md:w-8/12 lg:w-6/12">
                        {children[0]}
                    </div>
                    <div className="md:w-8/12 lg:ml-6 lg:w-5/12">
                        {children[1]}
                    </div>
                </div>
            </div>
        </section>
    )
}