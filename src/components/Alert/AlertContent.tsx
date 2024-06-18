interface AlertContentProps {
    text: string;
}

export const AlertContent = ({text }: AlertContentProps) => {
    return (
        <div className="flex items-center">
            <span className="ml-1">
                { text }
            </span>
        </div>
    )
}