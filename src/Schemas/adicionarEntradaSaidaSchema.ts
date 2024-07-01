import { z } from "zod";

export const adicionarEntradaSaidaSchema = z.object({
    quantidade: z.number().positive('Quantidade deve ser maior que zero'),
    lote: z.number().positive('Lote deve ser maior que zero'),
    fornecedor: z.number().positive('Fornecedor deve ser maior que zero'),
    produto: z.number().positive('Produto deve ser maior que zero')
});

export type AdicionarEntradaSaidaSchema = z.infer<typeof adicionarEntradaSaidaSchema>;
