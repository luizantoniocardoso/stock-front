interface FormsTextProps {
    children?: React.ReactNode;
    text: string;
    size?: number;
}


export const FormsText = ({text, children, size}: FormsTextProps) => {

    return(
        <p className={`mt-6 text-center text-[${size}px]`}>
            {text}
            {children}
        </p>
    )
}

