import { AlertContext } from "@/Contexts";
import { useContext } from "react";


type AlertContextType = "success" | "danger" | "warning" | "info";

interface AlertContextProps {
    type: AlertContextType;
    time: number;
    text: string;
    title: string;
    onCloseAlert: () => void;
}


export const useAlert = () => {
    const context = useContext(AlertContext);
    if (!context) {
        throw new Error("useAlert must be used within an AlertProvider");
    }
    return context;
};