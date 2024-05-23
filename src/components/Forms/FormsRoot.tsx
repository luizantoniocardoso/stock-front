import { ReactNode } from "react";

interface FormsRootProps {
    children: ReactNode;
}


export const FormsRoot = ({children}: FormsRootProps) => {

    return(
        <div className="md:w-full lg:ml-6 lg:w-5/6">
            <form>
                {children}
            </form>
        </div>
    )
}

   
  