import { z } from "zod";

export const adicionarProdutoSchema = z.object({
    descricao: z.string().min(3, 'Descrição deve ter no mínimo 3 caracteres'),
    custo: z.number().positive('Custo deve ser maior que zero'),
    preco: z.number().positive('Preço deve ser maior que zero'),
    quantidadeMinima: z.number().positive('Quantidade mínima deve ser maior que zero'),
    quantidadeMaxima: z.number().positive('Quantidade máxima deve ser maior que zero'),
    validade: z.string().refine(value => {
        const date = new Date(value);
        const now = new Date();
        return date > now;
    }, {
        message: 'Data de validade deve ser maior que a data atual'
    }),
    categoria: z.number().positive('Categoria deve ser maior que zero')
});

export type AdicionarProdutoSchema = z.infer<typeof adicionarProdutoSchema>;
