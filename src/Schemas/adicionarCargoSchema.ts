import { z } from "zod";

export const adicionarCargoSchema = z.object({
    descricao: z.string().min(3, 'Descrição deve ter no mínimo 3 caracteres'),
    nivel: z.string().min(3, 'Nível deve ter no mínimo 3 caracteres'),
});

export type AdicionarCargoSchema = z.infer<typeof adicionarCargoSchema>;