import { format } from "date-fns";

type InputType = string | null | undefined;

export const formatterData = (object: InputType): string => {
    const regex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/;
    const isValidFormat = (input: string): boolean => regex.test(input);
    if (typeof object === 'string' && isValidFormat(object)) return format(new Date(object), 'dd/MM/yyyy');
    return object ? object.toString() : "Não informado";
};
