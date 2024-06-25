import { Alert } from "@/Components";
import { AlertContext } from "@/Contexts";
import { ReactNode, useState } from "react";

type AlertContextType = "success" | "danger" | "warning" | "info";

interface AlertContextProps {
    type: AlertContextType;
    time: number;
    text: string;
    title: string;
    onCloseAlert: () => void;
}

interface AlertProviderProps {
    children: ReactNode;
}


export const AlertProvider = ({ children }: AlertProviderProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [alert, setAlert] = useState<AlertContextProps>({
        type: 'success',
        text: '',
        title: '',
        time: 5000,
        onCloseAlert: () => setIsOpen(false),
    });
    
    return (
        <AlertContext.Provider value={{openAlert(alert) { setAlert(alert); setIsOpen(true)}}}>
            <Alert.Root setOpen={setIsOpen} open={isOpen} time={alert.time} type={alert.type} onClose={alert.onCloseAlert}>
                    <Alert.Title title={alert.title} />
                    <Alert.Content text={alert.text} />
            </Alert.Root>
            {children}
        </AlertContext.Provider>
    );
};
