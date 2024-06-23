
interface FormsSmallTextProps {
    text: string;
    id: string;
}


export const FormsSmallText = ({text, id}: FormsSmallTextProps) => {
    return(
        <small id={id} className="absolute w-full text-dangerVar dark:text-dangerVar">
            {text}
        </small>
    )
}