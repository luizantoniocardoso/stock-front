import { isValidCPF } from "@/Utils";
import { z } from "zod";



export const cadastroUserSchema = z.object({
  email: z.string().email('Email é inválido'),
  password: z.string().min(6, 'Senha deve ter no mínimo 6 caracteres'),
  confirmPassword: z.string().min(6, 'Senha deve ter no mínimo 6 caracteres'),
  nome: z.string().min(3, 'Nome deve ter no mínimo 3 caracteres'),
  cpf: z.string()
    .min(11, 'CPF deve ter 11 caracteres')
    .refine(isValidCPF, {
      message: 'CPF inválido',
    }).refine(value => /^[0-9]+$/.test(value), {
        message: 'campo cpf so aceita numeros',
    })
}).refine(data => data.password === data.confirmPassword, {
  message: 'Senhas devem ser iguais',
  path: ['confirmPassword'],
});

export type CadastroUserSchema = z.infer<typeof cadastroUserSchema>;

