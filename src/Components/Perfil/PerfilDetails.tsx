interface PerfilDetailsProps {
    isEditing: boolean;
    nome: string;
    email: string;
    cpf: string;
    setNome: (value: string) => void;
    setEmail: (value: string) => void;
    setCpf: (value: string) => void;
}

export const PerfilDetails = ({ isEditing, nome, email, cpf, setNome, setEmail, setCpf }: PerfilDetailsProps) => {
    return (
        <div className="mt-6">
            <h3 className="text-lg font-medium">Dados principais</h3>
            <div className="grid grid-cols-2 gap-4 mt-4">
                <div>
                    <label className="block text-gray-700">Nome</label>
                    {isEditing ? (
                        <input
                            className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                            type="text"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                        />
                    ) : (
                        <p className="px-4 py-2 mt-2 border rounded-lg">{nome}</p>
                    )}
                </div>
                <div>
                    <label className="block text-gray-700">E-mail</label>
                    {isEditing ? (
                        <input
                            className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    ) : (
                        <p className="px-4 py-2 mt-2 border rounded-lg">{email}</p>
                    )}
                </div>
                <div>
                    <label className="block text-gray-700">CPF</label>
                    {isEditing ? (
                        <input
                            className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                            type="text"
                            value={cpf}
                            onChange={(e) => setCpf(e.target.value)}
                        />
                    ) : (
                        <p className="px-4 py-2 mt-2 border rounded-lg">{cpf}</p>
                    )}
                </div>
            </div>
        </div>
    );
};
