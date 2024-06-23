import { z } from "zod";


export const loginSchema = z.object({
    email: z.string().email('Email é invalido'),
    password: z.string().min(6, 'Senha deve ter no minimo 6 caracteres'),
});

export type LoginSchema = z.infer<typeof loginSchema>;
