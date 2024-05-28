import { ReactNode } from "react";


interface LoginCardRootProps {
    children: ReactNode[];
}



export const LoginCardRoot = ({ children }: LoginCardRootProps ) => {
    return (
        <section className="p-10 rounded-md">
            <div className="container h-full px-6 py-24">
                <div className="flex flex-wrap items-center justify-center h-full g-6 lg:justify-between">
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