import { CadastroUserSchema, cadastroUserSchema } from "./cadastroUserSchema";
import { forgetPasswordSchema, ForgetPasswordSchema} from "./forgetPassword";
import { LoginSchema, loginSchema } from "./loginSchema";

export type { LoginSchema, CadastroUserSchema, ForgetPasswordSchema };

export {
    loginSchema,
    cadastroUserSchema,
    forgetPasswordSchema,
};