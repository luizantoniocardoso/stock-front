import { ChangeEvent, MouseEvent, useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import { LoginCard } from "@/components/LoginCard"
import { Forms } from "@/components/Forms"
import { useFetch } from "@/Hooks"
import { loginSchema, LoginSchema } from "@/Schemas"
import { api } from "@/Enviroments"
import { useAuth } from "@/Contexts"


interface DataAuth {
    menssage: string;
    token: string;
    empresa: number;
  }



export const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [login, setLogin] = useState<LoginSchema>({email: '', password: ''});
    const [authResponse, authfetchData] = useFetch();
    const [error , setError] = useState({email: '', password: ''})

    // const [dataStorage,  setLocalStorageValue, clearLocalStorage] = useLocalStorage('token', null);
    const navigate = useNavigate();
    const auth = useAuth();

    const refEmail = useRef<HTMLInputElement>(null);
    const refPassword = useRef<HTMLInputElement>(null);

    const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => setLogin( {...login, email: e.target.value})
    const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => setLogin( {...login, password: e.target.value})

    const handleCheckBoxChange = () => {
        setShowPassword(!showPassword);
        refPassword.current?.focus();
        if(showPassword) return refPassword.current?.setAttribute("type", "password");
        return refPassword.current?.setAttribute("type", "text");
    }

    const handleLogin = async (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const loginSchemaValidator = loginSchema.safeParse(login)

        if(!loginSchemaValidator.success){
            setError( { 
                email: loginSchemaValidator.error.formErrors.fieldErrors.email ? loginSchemaValidator.error.formErrors.fieldErrors.email[0] : '',
                password: loginSchemaValidator.error.formErrors.fieldErrors.password ? loginSchemaValidator.error.formErrors.fieldErrors.password[0] : ''
            });
            return;
        }
        setError({email: '', password: ''})
        const url = `${api.url}/auth`;
        const body = JSON.stringify( { email: loginSchemaValidator.data.email, senha: loginSchemaValidator.data.password });
        const headers = { 'Content-Type': 'application/json' };
        await authfetchData(url, {body, headers, method: 'POST'});  
    };


    useEffect(() => {
        if (authResponse.data){
            auth?.login(authResponse?.data as DataAuth);        
            navigate('/home');
        }
    }, [authResponse.data, auth, navigate])
    

    return(
        <section className="flex items-center justify-center w-full h-screen bg-slate-200" >
            <LoginCard.Root>
                <LoginCard.Img src="img/1.png" alt="Imagem de login" />
                <Forms.Root>
                    <Forms.Title text="Bem-vindo" size={32} />
                    <Forms.Input id="emailInput" arialabel="Email" type="text" placeholder="Email" ref={refEmail} onChangeAction={handleEmailChange} value={login.email}>
                     {error.email && <Forms.Small id="emailInput" text={error.email} />}
                    </Forms.Input>
                    <Forms.Input id="passwordInput" arialabel="Senha" type="password" placeholder="Senha" ref={refPassword} onChangeAction={handlePasswordChange} value={login.password}>
                     {error.password && <Forms.Small id="passwordInput" text={error.password} />}
                    </Forms.Input>
                    <Forms.CheckBox id="senha" content="Mostrar a senha" action={handleCheckBoxChange} checked={showPassword}>
                        <Forms.Link href="/home" text="Esqueceu a senha?"/>
                    </Forms.CheckBox>
                    <Forms.Divider />
                    <Forms.Button text="Entrar" action={handleLogin}/>
                    <Forms.Text text="Não tem uma conta?">
                        <Forms.Link href="/register" text=" Cadastre-se"/>
                    </Forms.Text>
                </Forms.Root>
            </LoginCard.Root>
        </section>
    )
}
