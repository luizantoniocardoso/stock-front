

interface LoginTextProps {
    children?: React.ReactNode;
    text: string;

}


export const LoginText = ({text, children}: LoginTextProps) => {

    return(
        <p className="mt-6 text-center">
            {text}
            {children}
        </p>
    )
}

