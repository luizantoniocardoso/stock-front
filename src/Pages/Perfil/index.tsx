import React, { useState } from 'react';
import { useAuth } from "@/Hooks";
import { PerfilComponents } from "@/Components/Perfil";

export const Perfil = () => {
    const auth = useAuth();
    const { user, empresa } = auth;

    const [isEditing, setIsEditing] = useState(false);
    const [nome, setNome] = useState(user?.nome || '');
    const [email, setEmail] = useState(user?.email || '');
    const [cpf, setCpf] = useState(user?.cpf || '');

    const handleEditClick = () => {
        setIsEditing(!isEditing);
    };

    const handleResetPassword = () => {
        alert('Redefinir senha!');
    };

    return (
        <PerfilComponents.Root>
            <PerfilComponents.Avatar
                src="img/user.png"
                alt="User avatar"
                onResetPassword={handleResetPassword}
                nome={user?.nome}
                cargo={user?.cargo?.descricao}
                empresa={empresa?.descricao}
            />
            <PerfilComponents.Details
                isEditing={isEditing}
                nome={nome}
                email={email}
                cpf={cpf}
                setNome={setNome}
                setEmail={setEmail}
                setCpf={setCpf}
            />
            <PerfilComponents.EditForm
                isEditing={isEditing}
                handleEditClick={handleEditClick}
            />
        </PerfilComponents.Root>
    );
};
