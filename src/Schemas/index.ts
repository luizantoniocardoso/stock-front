import { AdicionarUserSchema, adicionarUserSchema  } from "./adicionarUserSchema";
import { CadastroUserSchema, cadastroUserSchema } from "./cadastroUserSchema";
import { forgetPasswordSchema, ForgetPasswordSchema} from "./forgetPassword";
import { LoginSchema, loginSchema } from "./loginSchema";
import { AdicionarProdutoSchema, adicionarProdutoSchema } from "./adicionarProdutoSchema";
import { AdicionarCategoriaSchema, adicionarCategoriaSchema } from "./adicionarCategoriaSchema";
import { AdicionarEstoqueSchema, adicionarEstoqueSchema } from "./adicionarEstoqueSchema";

export type { LoginSchema, CadastroUserSchema, ForgetPasswordSchema, AdicionarUserSchema, AdicionarProdutoSchema, AdicionarCategoriaSchema, AdicionarEstoqueSchema };

export {
    loginSchema,
    cadastroUserSchema,
    forgetPasswordSchema,
    adicionarUserSchema, 
    adicionarProdutoSchema,
    adicionarCategoriaSchema,
    adicionarEstoqueSchema
};