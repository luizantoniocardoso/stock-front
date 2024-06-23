import { TEAlert } from "tw-elements-react"

interface AlertRootProps {
    children: React.ReactNode;
    time: number;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    open: boolean;
    type: 'success' | 'danger' | 'warning' | 'info';
    onClose?: () => void;
}   


export const AlertRoot = ({ children, time, setOpen, open, type, onClose}: AlertRootProps) => {
    return (
        <div>
            <TEAlert dismiss autohide delay={time} open={open} setOpen={setOpen} onClose={onClose} color={`bg-${type}-100 text-${type}-700`}>
                {children}
            </TEAlert>
        </div>
    )
}