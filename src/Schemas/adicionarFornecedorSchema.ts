import { z } from "zod";

export const adicionarFornecedorSchema = z.object({
    descricao: z.string().min(3, 'Descrição deve ter no mínimo 3 caracteres'),
    email: z.string().email('Email inválido'),
    telefone: z.string().regex(/^\d{11}$/, 'Telefone deve ter 11 dígitos'),
    cnpj: z.string().regex(/^\d{14}$/, 'CNPJ deve ter 14 dígitos'),
    logradouro: z.string().min(3, 'Logradouro deve ter no mínimo 3 caracteres'),
    cidade: z.number().positive('Cidade deve ser maior que zero')
});

export type AdicionarFornecedorSchema = z.infer<typeof adicionarFornecedorSchema>;
