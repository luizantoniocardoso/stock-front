import { createContext } from "react";


type AlertContextType = "success" | "danger" | "warning" | "info";

interface AlertContextOpenAlert {
  type: AlertContextType;
  time: number;
  text: string;
  title: string;
  onCloseAlert: () => void;
}


interface AlertContextProps {
  openAlert: (alert: AlertContextOpenAlert) => void;
}

const initialStateAlert: AlertContextProps = {
  openAlert: () => { 
    console.log("Alerta aberto");
  },
};

export const AlertContext = createContext<AlertContextProps>(initialStateAlert);
