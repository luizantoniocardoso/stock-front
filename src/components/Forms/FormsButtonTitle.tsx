


interface FormsTitleProps {
    text: string;
    size?: number;
}

export const FormsTitle = ({text, size = 16}: FormsTitleProps) => {
    return (
        <h1 className={`relative w-full mb-6 text-center text-[${size}px]`} >
        {text}    
        </h1>
    )
}