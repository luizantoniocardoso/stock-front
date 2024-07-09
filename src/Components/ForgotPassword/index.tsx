import { Modal, Forms } from '@/Components';
import { forgetPasswordSchema, ForgetPasswordSchema } from '@/Schemas';
import { useFetch } from '@/Hooks';
import { useEffect, useRef, useState } from 'react';
import { api } from '@/Enviroments';

interface ForgotPasswordProps {
    isModalOpen: boolean;
    setIsModalOpen:  React.Dispatch<React.SetStateAction<boolean>>
}

type ForgetPasswordResponseData = {
    message: string;
}


export const ForgotPassword = ({isModalOpen, setIsModalOpen}: ForgotPasswordProps) => {
    const [email, setEmail] = useState<ForgetPasswordSchema>({email: ''});
    const [error , setError] = useState({email: ''});
    
    const emailRef = useRef<HTMLInputElement>(null);

    const [forgotResponse, forgotFetchData] = useFetch<ForgetPasswordResponseData>();

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => setEmail({email: e.target.value});

    const handleForgotPassword = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const forgotPasswordSchemaValidator = forgetPasswordSchema.safeParse(email);
        
        if(!forgotPasswordSchemaValidator.success){
            setError( { 
                email: forgotPasswordSchemaValidator.error.formErrors.fieldErrors.email ? forgotPasswordSchemaValidator.error.formErrors.fieldErrors.email[0] : '',
            });
            return;
        }
        setError({email: ''});
        const url = `${api.url}/forgotPassword`;
        const body = JSON.stringify( { email: forgotPasswordSchemaValidator.data.email });
        const headers = { 'Content-Type': 'application/json' };
        await forgotFetchData(url, {body, headers, method: 'POST'});
    }

    useEffect(() => {
        if(forgotResponse.data){
            emailRef.current!.value = '';
            setEmail({email: ''});
            setIsModalOpen(false);
            return
        }
    }, [forgotResponse, setIsModalOpen]);


    return (     
            <Modal.Root showModal={isModalOpen} setShowModal={setIsModalOpen}>
                <Modal.Header title="Esqueceu a Senha" setShowModal={setIsModalOpen}/>
                <Modal.Body>
                    <Forms.Root>
                        <Forms.Title text="Digite seu email" size={16} aling="left"/>
                        <Forms.Input ref={emailRef} type="email" id="email"  placeholder="Email" arialabel="Email" onChangeAction={handleEmailChange}>
                            {error.email && <Forms.Small id="emailInput" text={error.email} />}
                        </Forms.Input>
                        
                    </Forms.Root>
                </Modal.Body>
                <Modal.Footer>
                    <Modal.Button onClickFunction={() => setIsModalOpen(false)} type="danger">
                        Fechar
                    </Modal.Button>
                    <Modal.Button onClickFunction={handleForgotPassword} type="success">
                        Aceitar
                    </Modal.Button>
                </Modal.Footer>
            </Modal.Root>
    )
}