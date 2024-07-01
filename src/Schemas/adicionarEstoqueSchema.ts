import { z } from "zod";

export const adicionarEstoqueSchema = z.object({
    descricao: z.string().min(3, 'Descrição deve ter no mínimo 3 caracteres'),
    empresa: z.number().positive('Empresa deve ser maior que zero')
});

export type AdicionarEstoqueSchema = z.infer<typeof adicionarEstoqueSchema>;
