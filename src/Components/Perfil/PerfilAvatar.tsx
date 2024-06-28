interface PerfilAvatarProps {
    src: string;
    alt: string;
    onResetPassword: () => void;
    nome: string | undefined;
    cargo: string | undefined;
    empresa: string | undefined;
}

export const PerfilAvatar = ({ src, alt, onResetPassword, nome, cargo, empresa }: PerfilAvatarProps) => {
    return (
        <div className="flex items-center">
            <img className="w-32 h-32 mr-4 border-4 border-white rounded-full" src={src} alt={alt} />
            <div>
                <h2 className="text-2xl font-semibold">{nome}</h2>
                <p className="text-gray-600">{cargo}</p>
                <p className="text-gray-600">{empresa}</p>
                <button className="text-blue-500 mt-2" onClick={onResetPassword}>Redefinir senha</button>
            </div>
        </div>
    );
};
