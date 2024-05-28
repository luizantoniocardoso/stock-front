


interface FormsTitleProps {
    text: string;
    size?: string;
}

export const FormsTitle = ({text, size}: FormsTitleProps) => {
    return (
        <h1 className={`relative w-full mb-6 text-center text-[${size}]`} >
        {text}    
        </h1>
    )
}