import type { Entrada, Fornecedor, Saida, Lote, Produto } from "@/Interfaces/Api";
import { format } from "date-fns";

type InputType = string | null | undefined | Fornecedor | Entrada | Saida | Lote | Produto;

export const formatterData = (object: InputType): string => {
    const regex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/;
    const isValidFormat = (input: string): boolean => regex.test(input);
    if (typeof object === 'string' && isValidFormat(object)) return format(new Date(object), 'dd/MM/yyyy');
    if (typeof object === 'object') return getTypeObject(object as Fornecedor | Lote | Produto);
    return object ? object.toString() : "Não informado";
};

const getTypeObject = (obj: Fornecedor  | Lote | Produto): string => {
    if ('descricao' in obj )return (obj as Fornecedor | Produto).descricao || "Não informado";
    if ('observacoes' in obj )return (obj as Lote).observacoes || "Não informado";
    return "Não informado";
};
