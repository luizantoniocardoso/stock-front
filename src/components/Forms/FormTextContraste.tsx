

interface FormsTextContrasteProps {
    text: string;
    onClick?: () => void;
}




export const FormsTextContraste = ({ text, onClick}: FormsTextContrasteProps) => {
    return (
        <p  onClick={onClick} className="text-contrastVar dark:text-contrastVar">
            {text}
        </p>
    )
}