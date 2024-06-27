import React from 'react';
import { useAuth } from "@/Hooks";

export const Perfil = () => {
    const auth = useAuth();
    const { user, empresa } = auth;

    return (
        <div className="max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-lg">
            <div className="flex justify-center mt-4">
                <img className="w-24 h-24 -mt-3 border-4 border-white rounded-full" src="https://i.pravatar.cc/300" alt="User avatar" />
            </div>
            <div className="mt-4 text-center">
                <h2 className="text-xl font-semibold">{user?.nome}</h2>
                <p className="text-gray-600">{user?.cargo?.descricao}</p>
                <p className="text-gray-600">{empresa?.descricao}</p>
            </div>
            <div className="p-4">
                <p className="text-gray-700">{user?.email}</p>
                <p className="text-gray-700">{user?.cpf}</p>
            </div>
        </div>
    );
};
