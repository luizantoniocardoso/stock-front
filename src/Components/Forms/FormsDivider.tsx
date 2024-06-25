interface FormsDividerProps {
    text?: string;
}

export const FormsDivider = ({ text }: FormsDividerProps) => {
  
  
    return (
        <div className="my-7 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
            <p className="mx-4 mb-0 font-semibold text-center dark:text-neutral-200">
                {text}
            </p>
        </div>
    )
}
