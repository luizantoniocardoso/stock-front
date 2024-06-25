import { ReactNode } from "react";


interface LoginCardRootProps {
    children: ReactNode[];
}



export const LoginCardRoot = ({ children }: LoginCardRootProps ) => {
    return (
        <section className="flex items-center justify-center w-full h-full">
            <div className="container flex items-center justify-center h-full px-6 py-24 w-[100%]">
                <div className="flex flex-wrap items-center justify-center g-6 lg:justify-between bg-backgroundVar-CONTRA rounded-2xl w-[100%]" >
                    <div className="h-[41rem] mb-12 md:mb-0 md:w-8/12 lg:w-5/12">
                        {children[0]}
                    </div>
                    <div className="pt-10 pb-10 mr-16 md:w-8/12 lg:w-4/12 xl:w-5/12" >
                        {children[1]}
                    </div>
                </div>
            </div>
        </section>
    )
}