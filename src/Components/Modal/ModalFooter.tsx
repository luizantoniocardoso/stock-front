import { ReactNode } from "react";
import { TEModalFooter } from "tw-elements-react";

interface ModalFooterProps {
    children: ReactNode;
}

export const ModalFooter = ({ children }: ModalFooterProps): JSX.Element => {

    return (
        <TEModalFooter>
            {children}
        </TEModalFooter>
    )
}
