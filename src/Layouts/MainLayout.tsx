import { Sidebar, Topbar } from "@/Components";
import { useAuth } from "@/Hooks";
import React, { useEffect, useState } from "react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUser, faCog, faBriefcase, faUsers, faPencil, faStar, faTruck, faBoxesStacked } from '@fortawesome/free-solid-svg-icons';

export const MainLayout = ({ children }: { children: React.ReactNode }) => {
    const auth = useAuth();
    const { empresa, user } = auth;
    const [data, setData] = useState<{ nome: string; cargo: string; descricao: string }>({nome: '', cargo: '', descricao: ''});

    useEffect(() => {
        if (empresa && user) {
            setData({ nome: user.nome, cargo: user.cargo?.descricao || '', descricao: empresa.descricao });
        }
    }, [empresa, user]);

    return (
        <main className="flex flex-col h-screen">
            <Topbar.Root>
                <Topbar.Logo path="img/1.png" alt="logo" />
                <Topbar.Nav>
                    <p>{data?.descricao}</p>
                </Topbar.Nav>
                <Topbar.User.Root user="https://i.pravatar.cc/300" empresa={data?.cargo} name={data.nome}>
                    <Topbar.User.Item onClick={() => console.log("Perfil")}>Perfil</Topbar.User.Item>
                    <Topbar.User.Divider />
                    <Topbar.User.Item onClick={() => auth.logout()}>Sair</Topbar.User.Item>
                </Topbar.User.Root>
            </Topbar.Root>
            <div className="flex flex-1 overflow-hidden">
                <Sidebar.Root>
                    <div className="flex flex-col">
                        <Sidebar.Item to="/home" description="Pagina principal"><FontAwesomeIcon icon={faHome} /></Sidebar.Item>
                        <Sidebar.Item to="/estoque" description="Cadastro de Estoque"><FontAwesomeIcon icon={faBriefcase}/> </Sidebar.Item>
                        <Sidebar.Item to="/produto" description="Cadastro de Produto"><FontAwesomeIcon icon={faPencil}/> </Sidebar.Item>
                        <Sidebar.Item to="/categoria" description="Cadastro de Categoria"><FontAwesomeIcon icon={faStar}/></Sidebar.Item>
                        <Sidebar.Item to="/fornecedor" description="Cadastro de Fornecedor"><FontAwesomeIcon icon={faTruck}/></Sidebar.Item>
                        <Sidebar.Item to="/lote" description="Cadastro de Lote"><FontAwesomeIcon icon={faBoxesStacked}/></Sidebar.Item>
                        <Sidebar.Item to="/users" description="Cadastro de Usuarios"><FontAwesomeIcon icon={faUsers} /> </Sidebar.Item>
                        <Sidebar.Item to="/profile" description="Perfil"><FontAwesomeIcon icon={faUser} /> </Sidebar.Item>
                    </div>
                    <div className="mt-auto">
                        <Sidebar.Item to="/settings" description="Configurações"><FontAwesomeIcon icon={faCog} /></Sidebar.Item>
                    </div>
                </Sidebar.Root>
                <div className="flex-1 overflow-auto bg-backgroundVar-CONTRA">
                    {children}
                </div>
            </div>
        </main>
    );
};
