import { isValidCPF } from "@/Utils";
import { z } from "zod";

export const adicionarUserSchema = z.object({
   cpf: z.string()
   .min(11, 'CPF deve ter 11 caracteres')
   .refine(isValidCPF, {
      message: 'CPF inválido',
   }).refine(value => /^[0-9]+$/.test(value), {
      message: 'campo cpf so aceita numeros',
   }),
  
   cargo: z.object({
      value: z.number().refine(value => value !== 999 && value !== 0, {message: 'Cargo inválido'}), 
      text: z.string()
   })
})

export type AdicionarUserSchema = z.infer<typeof adicionarUserSchema>;
