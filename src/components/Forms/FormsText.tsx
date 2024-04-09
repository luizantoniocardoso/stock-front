

interface FormsTextProps {
    children?: React.ReactNode;
    text: string;

}


export const FormsText = ({text, children}: FormsTextProps) => {

    return(
        <p className="mt-6 text-center">
            {text}
            {children}
        </p>
    )
}

