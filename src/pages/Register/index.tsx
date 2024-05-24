
import { Forms } from "@/components/Forms";
import { RegisterCard } from "@/components/RegisterCard.tsx";
import { useFetch } from "@/Hooks";
import { ChangeEvent, MouseEvent, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";




export const Register = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState("");
    const [password, setPassword] = useState("");
    const [nome, setNome] = useState("");
    const [cpf, setCpf] = useState("");
    const [email, setEmail] = useState("");
    const [errorInput, setErrorInput] = useState(false);
    const [response, fetchData] = useFetch();
    
    const refEmail = useRef<HTMLInputElement>(null);
    const refPassword = useRef<HTMLInputElement>(null);
    const refConfirmPassword = useRef<HTMLInputElement>(null);
    const refNome = useRef<HTMLInputElement>(null);
    const refCpf = useRef<HTMLInputElement>(null);

    const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)
    const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)

    const navigate = useNavigate();

    const handleCheckBoxChange = () => {
        setShowPassword(!showPassword)
        refPassword.current?.focus()
        if(showPassword) {
            refPassword.current?.setAttribute("type", "password") 
            refConfirmPassword.current?.setAttribute("type", "password")
            return
        }
        refPassword.current?.setAttribute("type", "text")
        refConfirmPassword.current?.setAttribute("type", "text")
        return 
    }

    const handleRegister = async (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (!email || !password || !cpf || !nome || !confirmPassword) return setErrorInput(true)
        
        await fetchData('https://tiagos-stock.up.railway.app/auth', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {
                    email,
                    senha: password
                }
            )
        })

        if(response.error) return setErrorInput(true)
        if (response.data){
            navigate('/home')
        }
        
    };


    return (
        <section className="flex items-center justify-center w-full h-screen bg-slate-200" >
            <RegisterCard.Root>
            <RegisterCard.Img src="/img/6.png" alt="Register" />
                <Forms.Root>
                    <Forms.Input id="emailInput" arialabel="Email" type="text" placeholder="Email" ref={refEmail} onChangeAction={handleEmailChange} value={email}>
                        {errorInput && <Forms.Small id="emailInput" text="Verifique se o Email esta correto" />}
                    </Forms.Input>
                    <Forms.Input id="passwordInput" arialabel="Senha" type="password" placeholder="Senha" ref={refPassword} onChangeAction={handlePasswordChange} value={password}>
                        {errorInput && <Forms.Small id="passwordInput" text="Verifique se a senha esta correta" />}
                    </Forms.Input>
                    <Forms.Input id="confirmPasswordInput" arialabel="Confirmar senha" type="password" placeholder="Confirmar senha" ref={refConfirmPassword} onChangeAction={(e) => setConfirmPassword(e.target.value)} value={confirmPassword}>
                        {errorInput && <Forms.Small id="confirmPasswordInput" text="As senhas não coincidem" />}
                    </Forms.Input>
                    <Forms.Input id="nomeInput" arialabel="Nome" type="text" placeholder="Nome" ref={refNome} onChangeAction={(e) => setNome(e.target.value)} value={nome}>
                        {errorInput && <Forms.Small id="nomeInput" text="Nome inválido" />}
                    </Forms.Input>
                    <Forms.Input id="cpfInput" arialabel="CPF" type="text" placeholder="CPF" ref={refCpf} onChangeAction={(e) => setCpf(e.target.value)} value={cpf}>
                        {errorInput && <Forms.Small id="cpfInput" text="CPF inválido" />}
                    </Forms.Input>
                    <Forms.CheckBox id="senha" content="Mostrar a senha" action={handleCheckBoxChange} checked={showPassword}>
                        <Forms.Link href="/home" text="Esqueceu a senha?"/>
                    </Forms.CheckBox>
                    <Forms.Button text="Cadastrar" action={handleRegister} />
                </Forms.Root>
            </RegisterCard.Root>
        </section>
    );
}
