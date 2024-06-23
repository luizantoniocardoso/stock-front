import { ReactNode } from "react";

interface FormsRootProps {
    children: ReactNode;
}


export const FormsRoot = ({children}: FormsRootProps) => {

    return(
        <div className="md:w-full">
            <form>
                {children}
            </form>
        </div>
    )
}

   
  