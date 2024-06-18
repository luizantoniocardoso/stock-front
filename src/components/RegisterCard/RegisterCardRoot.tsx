

import { ReactNode } from "react";


interface RegisterCardRootProps {
    children: ReactNode[];
}


export const RegisterCardRoot = ({ children }: RegisterCardRootProps ) => {
    return (
        <section className="h-screen w-[70%]">
            <div className="container flex items-center justify-center h-full px-6 py-24 w-[100%]">
                <div className="flex flex-wrap items-center justify-center g-6 lg:justify-between bg-backgroundVar-CONTRA rounded-xl w-[100%]" >
                    <div className="h-[100%] mb-12 md:mb-0 md:w-8/12 lg:w-6/12">
                        {children[0]}
                    </div>
                    <div className="pt-10 pb-10 md:w-8/12 lg:ml-6 lg:w-5/12">
                        {children[1]}
                    </div>
                </div>
            </div>
        </section>
    )
}