
interface FormsSmallTextProps {
    text: string;
    id: string;
}


export const FormsSmallText = ({text, id}: FormsSmallTextProps) => {
    return(
        <small id={id} className="absolute w-full text-red-600 dark:text-red-600" >
            {text}
        </small>
    )
}