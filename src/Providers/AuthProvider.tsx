import { AuthContext } from "@/Contexts";
import { useLocalStorage } from "@/Hooks";
import { ReactNode, useState, useEffect } from "react";

interface DataAuth {
  menssage: string;
  token: string;
  empresa: number;
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const { setItem, getItem, removeItem } = useLocalStorage();
    
    const getLoginByLocalStorage = () => {
        const token = getItem('token');
        const empresa = getItem('empresa');
        if (token && empresa) {
            setIsAuthenticated(true);
            return {
                menssage: '',
                token,
                empresa: parseInt(empresa)
            };
        }
        return null;
    };

    const [dataLogin, setDataLogin] = useState<DataAuth | null>(getLoginByLocalStorage);

    useEffect(() => {
        const storedData = getLoginByLocalStorage();
        if (storedData) {
            setDataLogin(storedData);
        }
    }, []);
    
    const login = (data: DataAuth) => {
        setItem('token', data.token);
        setItem('empresa', data.empresa.toString());
        setDataLogin(data);
        setIsAuthenticated(true);
    };
    
    const logout = () => {
        removeItem('token');
        removeItem('empresa');
        setDataLogin(null);
        setIsAuthenticated(false);
    };
  
    return (
      <AuthContext.Provider value={{ isAuthenticated, login, logout, dataLogin }}>
        {children}
      </AuthContext.Provider>
    );
};
