import { AdicionarUserSchema, adicionarUserSchema  } from "./adicionarUserSchema";
import { CadastroUserSchema, cadastroUserSchema } from "./cadastroUserSchema";
import { forgetPasswordSchema, ForgetPasswordSchema} from "./forgetPassword";
import { LoginSchema, loginSchema } from "./loginSchema";
import { AdicionarProdutoSchema, adicionarProdutoSchema } from "./adicionarProdutoSchema";

export type { LoginSchema, CadastroUserSchema, ForgetPasswordSchema, AdicionarUserSchema, AdicionarProdutoSchema };

export {
    loginSchema,
    cadastroUserSchema,
    forgetPasswordSchema,
    adicionarUserSchema, 
    adicionarProdutoSchema
};