


interface FormsTitleProps {
    text: string;
    size?: number;
    aling?: 'center' | 'left' | 'right' | 'justify' | 'initial' | 'inherit' | 'start' | 'end' | 'space-between' | 'space-around' | 'space-evenly' | 'stretch' | 'baseline' 
}

export const FormsTitle = ({text, size = 4, aling = 'center'}: FormsTitleProps) => {
    return (
        <h1 className={`relative w-full mb-6 text-${aling} text-[${size}px]`} >
            {text}    
        </h1>
    )
}