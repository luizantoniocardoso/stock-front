import { TEModalHeader } from "tw-elements-react"


interface ModalHeaderProps {
    setShowModal: (show: boolean) => void;
    title : string;
}

export const ModalHeader = ({ setShowModal, title }: ModalHeaderProps): JSX.Element => {


    return (
        <TEModalHeader>
            <h5 className="text-xl font-medium leading-normal text-neutral-800 dark:text-neutral-200">
                {title}
            </h5>
            <button type="button"
                className="box-content border-none rounded-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
                onClick={() => setShowModal(false)}
                aria-label="Close"
            >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
            </svg>
            </button>
        </TEModalHeader>
    )
}