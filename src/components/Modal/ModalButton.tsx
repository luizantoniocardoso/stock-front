import { MouseEvent } from "react";
import { TERipple } from "tw-elements-react";

interface ModalButtonProps {
    children: string;
    type?: "success" | "danger" | "warning" | "info" | "default";
    onClickFunction: (e: MouseEvent<HTMLButtonElement>) => void ;
}

export const ModalButton = ({ children, type = "default", onClickFunction }: ModalButtonProps) => {
    
    const getClassButton = () => {
        switch (type) {
            case "success":
                return "text-successVar hover:text-white border border-successVar hover:bg-successVar-600 focus:ring-successVar-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-successVar-500 dark:text-successVar-500 dark:hover:text-white dark:hover:bg-successVar-600 dark:focus:ring-successVar-600";
            case "danger":
                return "text-dangerVar hover:text-white border border-dangerVar hover:bg-dangerVar-600 focus:ring-dangerVar-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-dangerVar-500 dark:text-dangerVar-500 dark:hover:text-white dark:hover:bg-dangerVar-600 dark:focus:ring-dangerVar-600";
            case "warning":
                return "text-warningVar hover:text-white border border-warningVar hover:bg-warningVar-600 focus:ring-warningVar-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-warningVar-500 dark:text-warningVar-500 dark:hover:text-white dark:hover:bg-warningVar-600 dark:focus:ring-warningVar-600";
            case "info":
                return "text-infoVar hover:text-white border border-infoVar hover:bg-infoVar-600 focus:ring-infoVar-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-infoVar-500 dark:text-infoVar-500 dark:hover:text-white dark:hover:bg-infoVar-600 dark:focus:ring-infoVar-600";
            default:
                return "text-gray-600 hover:text-white border border-gray-300 hover:bg-gray-200 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-gray-500 dark:text-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600";
        }
    };

    return (
        <TERipple rippleColor="light">
            <button 
                type="button"
                onClick={onClickFunction}
                className={`inline-block ${getClassButton()} focus:outline-none focus:ring-0`}
                data-twe-ripple-init
            >
                {children}
            </button>
        </TERipple>
    );
};
