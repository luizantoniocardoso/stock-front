interface Empresa {
    id: number;
    descricao: string;
    cnpj: string;
    telefone: string;
    logradouro: string;
    cidade: number;
    ativo: boolean;
    createdAt: string;
    updatedAt: string;
}

interface Cargo {
    id: number;
    descricao: string;
    nivel: string;
    createdAt: string;
    updatedAt: string;
}

interface User {
    id: number;
    nome: string;
    email: string;
    cpf: string;
    senha: string;
    createdAt: string;
    updatedAt: string;
    empresa: Empresa;
    cargo: Cargo | null;
}

  
export interface Auth {
    menssage: string;
    token: string;
    empresa: number;  
    usuario: number;
}


export interface UserResponse {
    users: User[];
}
export interface EmpresaResponse {
    companies: Empresa[];
}

export interface CargoResponse {
    cargos: Cargo[];
}