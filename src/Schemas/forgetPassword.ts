import { z } from "zod";

export const forgetPasswordSchema = z.object({
  email: z.string().email('Email é inválido'),
});

export type ForgetPasswordSchema = z.infer<typeof forgetPasswordSchema>;
