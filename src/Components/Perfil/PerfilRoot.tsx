import { ReactNode } from "react";

interface PerfilRootProps {
    children: ReactNode[];
}

export const PerfilRoot = ({ children }: PerfilRootProps) => {
    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="w-full max-w-4xl mx-4 bg-white rounded-lg shadow-lg p-6">
                {children}
            </div>
        </div>
    );
};
