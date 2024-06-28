interface PerfilEditFormProps {
    isEditing: boolean;
    handleEditClick: () => void;
}

export const PerfilEditForm = ({ isEditing, handleEditClick }: PerfilEditFormProps) => {
    return (
        <div className="flex justify-center pb-4 mt-6">
            <button
                className="px-4 py-2 text-white bg-indigo-500 rounded hover:bg-indigo-700"
                onClick={handleEditClick}
            >
                {isEditing ? 'Salvar' : 'Editar'}
            </button>
        </div>
    );
};
