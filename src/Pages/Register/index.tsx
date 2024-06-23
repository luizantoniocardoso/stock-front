import { RegisterCard, Forms } from "@/Components";

import { Alert } from "@/Components/Alert";
import { useFetch } from "@/Hooks";
import { cadastroUserSchema, CadastroUserSchema } from "@/Schemas";
import { ChangeEvent, MouseEvent, useRef, useState } from "react";
import { api } from "@/Enviroments";
import { useNavigate } from "react-router-dom";

interface alertInterface {
    type: "success" | "danger" | "warning" | "info";
    time: number;
    text: string;
    title: string;
}

export const Register = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [response, fetchData] = useFetch();
    const [alert, setAlert] = useState<alertInterface>({
        type: "success",
        time: 5000,
        text: "",
        title: "",
    });

    const [open, setOpen] = useState(false);

    const [cadastro, setCadastro] = useState<CadastroUserSchema>({
        email: "",
        password: "",
        confirmPassword: "",
        nome: "",
        cpf: "",
    });

    const [error, setError] = useState({
        email: "",
        password: "",
        confirmPassword: "",
        nome: "",
        cpf: "",
    });

    const refEmail = useRef<HTMLInputElement>(null);
    const refPassword = useRef<HTMLInputElement>(null);
    const refConfirmPassword = useRef<HTMLInputElement>(null);
    const refNome = useRef<HTMLInputElement>(null);
    const refCpf = useRef<HTMLInputElement>(null);

    const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) =>
        setCadastro({ ...cadastro, email: e.target.value });
    const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) =>
        setCadastro({ ...cadastro, password: e.target.value });
    const handleConfirmPasswordChange = (e: ChangeEvent<HTMLInputElement>) =>
        setCadastro({ ...cadastro, confirmPassword: e.target.value });
    const handleNomeChange = (e: ChangeEvent<HTMLInputElement>) =>
        setCadastro({ ...cadastro, nome: e.target.value });
    const handleCpfChange = (e: ChangeEvent<HTMLInputElement>) =>
        setCadastro({ ...cadastro, cpf: e.target.value });

    const navigate = useNavigate();

    const handleCheckBoxChange = () => {
        setShowPassword(!showPassword);
        refPassword?.current?.focus();
        if (showPassword) {
            refPassword?.current?.setAttribute("type", "password");
            refConfirmPassword?.current?.setAttribute("type", "password");
            return;
        }
        refPassword?.current?.setAttribute("type", "text");
        refConfirmPassword?.current?.setAttribute("type", "text");
        return;
    };

    const handleRegister = async (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const cadastroSchemaValidator = cadastroUserSchema.safeParse(cadastro);

        if (!cadastroSchemaValidator.success) {
            setError({
                email: cadastroSchemaValidator?.error?.formErrors?.fieldErrors?.email ? cadastroSchemaValidator?.error?.formErrors?.fieldErrors?.email[0] : "",
                password: cadastroSchemaValidator?.error?.formErrors?.fieldErrors?.password ? cadastroSchemaValidator?.error?.formErrors?.fieldErrors?.password[0] : "",
                confirmPassword: cadastroSchemaValidator?.error?.formErrors?.fieldErrors?.confirmPassword ? cadastroSchemaValidator?.error?.formErrors?.fieldErrors?.confirmPassword[0] : "",
                nome: cadastroSchemaValidator?.error?.formErrors?.fieldErrors?.nome ? cadastroSchemaValidator?.error?.formErrors?.fieldErrors?.nome[0] : "",
                cpf: cadastroSchemaValidator?.error?.formErrors?.fieldErrors?.cpf ? cadastroSchemaValidator?.error?.formErrors?.fieldErrors?.cpf[0]: "",
            });
            return;
        }

        setError({
            email: "",
            password: "",
            confirmPassword: "",
            nome: "",
            cpf: "",
        });

        const url = `${api.url}/usuario`;
        const body = JSON?.stringify({
            email: cadastroSchemaValidator?.data?.email,
            senha: cadastroSchemaValidator?.data?.password,
            nome: cadastroSchemaValidator?.data?.nome,
            cpf: cadastroSchemaValidator?.data?.cpf,
        });
        const headers = { "Content-Type": "application/json" };
        await fetchData(url, { body, headers, method: "POST" });

        if (!response?.data) {
            setAlert({
                type: "danger",
                time: 5000,
                text: "Usuario já cadastrado",
                title: "Erro",
            });
            setOpen(true);
            return;
        }

        setCadastro({
            email: "",
            password: "",
            confirmPassword: "",
            nome: "",
            cpf: "",
        });
        setAlert({
            type: "success",
            time: 5000,
            text: "Cadastro realizado com sucesso",
            title: "Sucesso",
        });
        setOpen(true);
        return;
    };

    const closeAlert = () => {
        setOpen(false);
        if (alert?.type === "success") {
            navigate("/login");
        }
    };

    return (
        <section className="flex items-center justify-center w-full h-screen bg-backgroundVar">
            <RegisterCard.Root>
                <RegisterCard.Img src="/img/1.png" alt="Register" />
                <Forms.Root>
                    <Forms.Title text="Cadastre-se" size={16}></Forms.Title>
                    <Forms.Input
                        id="nomeInput"
                        arialabel="Nome"
                        type="text"
                        placeholder="Nome"
                        ref={refNome}
                        onChangeAction={handleNomeChange}
                        value={cadastro?.nome}
                    >
                        {error?.nome && <Forms.Small id="nomeInput" text={error?.nome} />}
                    </Forms.Input>
                    <Forms.Input
                        id="emailInput"
                        arialabel="Email"
                        type="text"
                        placeholder="Email"
                        ref={refEmail}
                        onChangeAction={handleEmailChange}
                        value={cadastro?.email}
                    >
                        {error?.email && <Forms.Small id="emailInput" text={error?.email} />}
                    </Forms.Input>
                    <Forms.Input
                        id="passwordInput"
                        arialabel="Senha"
                        type="password"
                        placeholder="Senha"
                        ref={refPassword}
                        onChangeAction={handlePasswordChange}
                        value={cadastro?.password}
                    >
                        {error?.password && ( <Forms.Small id="passwordInput" text={error?.password} />)}
                    </Forms.Input>
                    <Forms.Input
                        id="confirmPasswordInput"
                        arialabel="Confirmar senha"
                        type="password"
                        placeholder="Confirmar senha"
                        ref={refConfirmPassword}
                        onChangeAction={handleConfirmPasswordChange}
                        value={cadastro?.confirmPassword}
                    >
                        {error?.confirmPassword && (
                            <Forms.Small
                                id="confirmPasswordInput"
                                text={error?.confirmPassword}
                            />
                        )}
                    </Forms.Input>
                    
                    <Forms.Input
                        id="cpfInput"
                        arialabel="CPF"
                        type="text"
                        placeholder="CPF"
                        ref={refCpf}
                        onChangeAction={handleCpfChange}
                        value={cadastro?.cpf}
                    >
                        {error?.cpf && <Forms.Small id="cpfInput" text={error?.cpf} />}
                    </Forms.Input>
                    <Forms.CheckBox
                        id="senha"
                        content="Mostrar a senha"
                        action={handleCheckBoxChange}
                        checked={showPassword}
                    />
                    <Forms.Divider />
                    <Forms.Button text="Cadastrar" action={handleRegister} />
                    <Forms.Text text="Já tem uma conta?">
                        <Forms.Link href="/login" text=" Entrar" />
                    </Forms.Text>
                </Forms.Root>
            </RegisterCard.Root>
            <Alert.Root
                open={open}
                setOpen={setOpen}
                time={alert?.time}
                type={alert?.type}
                onClose={closeAlert}
            >
                <Alert.Title title={alert?.title} />
                <Alert.Content text={alert?.text} />
            </Alert.Root>
        </section>
    );
};
