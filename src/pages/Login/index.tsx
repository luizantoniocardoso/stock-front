import { ChangeEvent, MouseEvent, useEffect, useRef, useState } from "react"
import { LoginCard } from "../../components/LoginCard"
import { Forms } from "../../components/Forms";
import { useNavigate } from "react-router-dom";




export const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState("");
    const [userName, setUserName] = useState("");
    const [error, setError] = useState(false);

    const navigate = useNavigate();


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
        const isCorrectLogin = userName === "admin" && password === "admin";
        if(isCorrectLogin) navigate("/home")
        if(!isCorrectLogin)setError(true)

    }

    

    return(
        <section className="flex items-center justify-center w-full h-screen bg-slate-200" >
            <LoginCard.Root>
                <LoginCard.Img src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg" alt="Imagem de login" />
                <Forms.Root>
                    <Forms.Input id="userNameInput" arialabel="Nome do usuario" type="text" placeholder="Nome do usuario" ref={refUserName} onChangeAction={handleUserNameChange} value={userName}>
                     {error && <Forms.Small id="userNameInput" text="Verifique se o usuario esta correto" />}
                    </Forms.Input>
                    <Forms.Input id="passwordInput" arialabel="Senha" type="password" placeholder="Senha" ref={refPassword} onChangeAction={handlePasswordChange} value={password}>
                     {error && <Forms.Small id="passwordInput" text="Verifique se a senha esta correta" />}
                    </Forms.Input>
                    <Forms.CheckBox id="senha" content="Mostrar a senha" action={handleCheckBoxChange} checked={showPassword}>
                        <Forms.Link href="/home" text="Esqueceu a senha?"/>
                    </Forms.CheckBox>
                    <Forms.Divider />
                    <Forms.Button text="Entrar" action={handleLogin}/>
                    <Forms.Text text="Não tem uma conta?">
                        <Forms.Link href="/home" text=" Cadastre-se"/>
                    </Forms.Text>
                </Forms.Root>
            </LoginCard.Root>
        </section>
    )
}
