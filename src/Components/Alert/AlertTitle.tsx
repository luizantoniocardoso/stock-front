interface AlertTitleProps {
    title: string;
}

export const AlertTitle = ({ title }: AlertTitleProps) => {
    return <strong>{ title }</strong>;
}
