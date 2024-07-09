import { z } from "zod";

export const adicionarLoteSchema = z.object({
    codigoBarras: z.string().min(3, 'Código de Barras deve ter no mínimo 3 caracteres'),
    quantidade: z.number().positive('Quantidade deve ser maior que zero'),
    dataFabricacao: z.string().refine(value => {
        const date = new Date(value);
        const now = new Date();
        return date <= now;
    }, {
        message: 'Data de fabricação deve ser menor ou igual a data atual'
    }),
    dataVencimento: z.string().refine(value => {
        const date = new Date(value);
        const now = new Date();
        return date > now;
    }, {
        message: 'Data de vencimento deve ser maior que a data atual'
    }),
    observacoes: z.string().optional(),
    produto: z.number().positive('Produto deve ser maior que zero')
});

export type AdicionarLoteSchema = z.infer<typeof adicionarLoteSchema>;
