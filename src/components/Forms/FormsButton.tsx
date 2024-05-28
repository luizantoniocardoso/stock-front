import { MouseEvent } from "react";
import { TERipple } from "tw-elements-react";

export interface FormsButtonProps{
    text: string;
    action: (e: MouseEvent<HTMLButtonElement>) => void;
}


export const FormsButton = ({ text, action }: FormsButtonProps) => {
    return (
        <TERipple rippleColor="light" className="w-full">
            <button 
            className="inline-block w-full rounded bg-contrast px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#F43500] 
            transition duration-150 ease-in-out hover:bg-contrast-600 hover:shadow-[0_8px_9px_-4px_rgba(244,53,0,0.3),0_4px_18px_0_rgba(244,53,0,0.2)]
             focus:bg-contrast-600 focus:shadow-[0_8px_9px_-4px_rgba(244,53,0,0.3),0_4px_18px_0_rgba(244,53,0,0.2)]
              focus:outline-none focus:ring-0 active:bg-contrast-700 active:shadow-[0_8px_9px_-4px_rgba(244,53,0,0.3),0_4px_18px_0_rgba(244,53,0,0.2)]
               dark:shadow-[0_4px_9px_-4px_rgba(244,53,0,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(244,53,0,0.2),0_4px_18px_0_rgba(244,53,0,0.1)]
                dark:focus:shadow-[0_8px_9px_-4px_rgba(244,53,0,0.2),0_4px_18px_0_rgba(244,53,0,0.1)]
                 dark:active:shadow-[0_8px_9px_-4px_rgba(244,53,0,0.2),0_4px_18px_0_rgba(244,53,0,0.1)]"
            onClick={action}
            >
                {text}
            </button>
        </TERipple>
    );
};
