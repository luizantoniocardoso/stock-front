


interface LoginSmallTextProps {
    text: string;
    id: string;
}


export const LoginSmallText = ({text, id}: LoginSmallTextProps) => {
    return(
        <small id={id} className="absolute w-full text-neutral-500 dark:text-neutral-200" >
            {text}
        </small>
    )
}