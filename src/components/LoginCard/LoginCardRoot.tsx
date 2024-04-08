import { ReactNode } from "react";

interface LoginCardRootProps {
    children: ReactNode;
}


export const LoginCardRoot = ({children}: LoginCardRootProps) => {

    return(
        <>
            <div className="block max-w-sm rounded-lg bg-white p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">                
                <form>
                    {children}
                </form>
            </div>
        </>
    )
}

   
  