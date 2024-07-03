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


export interface ListUserResponse {
    users: User[];
}
export interface UserResponse {
    user: User
}
export interface EmpresaResponse {
    companies: Empresa[];
}

export interface CargoResponse {
    cargos: Cargo[];
}

export interface CategoriaResponse {
    categorias: Categoria[];
}

export interface ProdutoResponse {
    products: Produto[];
}

export interface EstoqueResponse {
    estoques: Estoque[];
}

export interface EntradaSaidaResponse {
    entries: EntradaSaida[];
}

export interface LoteResponse {
    lots: Lote[];
}

export interface FornecedorResponse {
    suppliers: Fornecedor[];
}

export interface Categoria {
    id: number;
    descricao: string;
    createdAt: string;
    updatedAt: string;
}

export interface Produto {
    id: number;
    descricao: string;
    custo: number;
    preco: number;
    quantidadeMinima: number;
    quantidadeMaxima: number;
    validade: string;
    createdAt: string;
    updatedAt: string;
    categoria: Categoria;
}

export interface Estoque {
    id: number;
    descricao: string;
    createdAt: string;
    updatedAt: string;
};

export interface Fornecedor {
    id: number;
    nome: string;
    cnpj: string;
    telefone: string;
    createdAt: string;
    updatedAt: string;
}

export interface Lote {
    id: number;
    quantidade: number;
    validade: string;
    createdAt: string;
    updatedAt: string;
    produto: Produto;
    fornecedor: Fornecedor;
    estoque: Estoque;
}

export interface EntradaSaida {
    id: number;
    quantidade: number;
    createdAt: string;
    updatedAt: string;
    lote: Lote;
    fornecedor: Fornecedor;
    produto: Produto;
}