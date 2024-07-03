import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"


interface ContentHeaderProps {
    children?: React.ReactNode;
    onClickToAdd?: () => void;
    title?: string;
    text?: string;
    permission: boolean;
}


export const ContentHeader = ({ children, onClickToAdd, title, text, permission }:ContentHeaderProps) => {
    return (
        <section className='flex justify-between w-full py-2 sm:px-8 lg:px-8'>
            <div>
            <h1 className='text-2xl font-bold'>{title}</h1>
            <p>{text}</p>
            </div>
            <div>
            <button disabled={!permission} onClick={ onClickToAdd } className="flex items-center gap-3 px-4 py-1 border rounded-lg border-textVar hover:bg-textVar hover:text-white hover:border-transparent">
                <FontAwesomeIcon icon={faPlus} /> Adicionar
            </button>
            </div>
            {children}
        </section>
    )
}