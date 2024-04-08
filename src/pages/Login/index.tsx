import { ChangeEvent, ChangeEventHandler, MouseEvent, useEffect, useRef, useState } from "react"
import { LoginCard } from "../../components/LoginCard"




export const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState("");
    const [userName, setUserName] = useState("");
    const [error, setError] = useState(false);

    const refUserName = useRef<HTMLInputElement>(null);
    const refPassword = useRef<HTMLInputElement>(null);

    const handleUserNameChange = (e: ChangeEvent<HTMLInputElement>) => setUserName(e.target.value)
    const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)
    
    useEffect(() => {
        setError(false)
    }, [password, userName])

    const handleCheckBoxChange = () => {
        setShowPassword(!showPassword)
        refPassword.current?.focus()

        if(showPassword) return refPassword.current?.setAttribute("type", "password")
        return refPassword.current?.setAttribute("type", "text")
    }

    const handleLogin = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if(true)setError(true)

    }

    

    return(
        <section className="flex items-center justify-center w-full h-screen bg-slate-200" >
            <div>
                <LoginCard.Root>
                    <LoginCard.Input id="userNameInput" arialabel="Nome do usuario" type="text" placeholder="Nome do usuario" ref={refUserName} onChangeAction={handleUserNameChange} value={userName}>
                        {error && <LoginCard.Small id="userNameInput" text="Verifique se o usuario esta correto" />}
                    </LoginCard.Input>
                    <LoginCard.Input id="passwordInput" arialabel="Senha" type="password" placeholder="Senha" ref={refPassword} onChangeAction={handlePasswordChange} value={password}>
                        {error && <LoginCard.Small id="passwordInput" text="Verifique se a senha esta correta" />}
                    </LoginCard.Input>
                    <LoginCard.CheckBox id="senha" content="Mostrar a senha" action={handleCheckBoxChange} checked={showPassword}/>
                    <LoginCard.Button text="Entrar" action={handleLogin}/>
                    <LoginCard.Text text="Não tem uma conta?">
                        <LoginCard.Link href="/#" text="Cadastre-se" />
                    </LoginCard.Text>

                </LoginCard.Root>
            </div>
        </section>
    )
}
