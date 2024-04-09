import { ReactNode } from "react";

interface FormsRootProps {
    children: ReactNode;
}


export const FormsRoot = ({children}: FormsRootProps) => {

    return(
        <div className="md:w-8/12 lg:ml-6 lg:w-8/12">
            <form>
                {children}
            </form>
        </div>
    )
}

   
  