import { z } from "zod";

export const adicionarCategoriaSchema = z.object({
    descricao: z.string().min(3, 'Descrição deve ter no mínimo 3 caracteres')
});

export type AdicionarCategoriaSchema = z.infer<typeof adicionarCategoriaSchema>;
