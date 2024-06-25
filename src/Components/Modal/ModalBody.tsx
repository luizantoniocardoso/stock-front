import { TEModalBody } from "tw-elements-react";

interface ModalBodyProps {
    children: string | JSX.Element;
}

export const ModalBody = ({ children } : ModalBodyProps) => { 
    return (
        <TEModalBody>{ children }</TEModalBody>
    )
}