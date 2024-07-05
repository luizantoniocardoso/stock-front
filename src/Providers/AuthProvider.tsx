import { AuthContext } from "@/Contexts";
import { api } from "@/Enviroments";
import { useFetch, useLocalStorage } from "@/Hooks";
import { Auth, Empresa, EmpresaResponse, User, UserResponse } from "@/Interfaces/Api";
import { ReactNode, useState, useEffect } from "react";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState<User | null>(null);
    const [empresa, setEmpresa] = useState<Empresa | null>(null);

    const [responseEmpresa, fetchDataEmpresa] = useFetch<EmpresaResponse>();
    const [responseUser, fetchDataUser] = useFetch<UserResponse>();

    const { setItem, getItem, removeItem } = useLocalStorage();

    const getLoginByLocalStorage = (): Auth | null => {
        const token = getItem('token');
        const empresa = getItem('empresa');
        const user = getItem('user');
        if (token && empresa && user) {
            setIsAuthenticated(true);
            return {
                menssage: '',
                token,
                empresa: parseInt(empresa),
                usuario: parseInt(user)
            };
        }
        return null;
    };

    const [dataLogin, setDataLogin] = useState<Auth | null>(getLoginByLocalStorage);

    useEffect(() => {
        const storedData = getLoginByLocalStorage();
        
        if (storedData) {
            setDataLogin(storedData);
        }
    }, []);

    const login = (data: Auth) => {
        setItem('token', data.token);
        setItem('empresa', data.empresa.toString());
        setItem('user', data.usuario.toString());
        setDataLogin(data);
        setIsAuthenticated(true);
    };

    const logout = () => {
        removeItem('token');
        removeItem('empresa');
        removeItem('user');
        setDataLogin(null);
        setIsAuthenticated(false);
    };

    const getEmpresaData = async () => {
        if (dataLogin) {
            const url = `${api.url}/empresa?empresa=${dataLogin.empresa}`; 
            const headers = { 
                'Authorization': `Bearer ${dataLogin.token}`,
                'Content-Type': 'application/json'
            };
            const method = 'GET';
            await fetchDataEmpresa(url, { headers, method });
            if (responseEmpresa.data) {
                setEmpresa(responseEmpresa.data.companies[0]);
            }
        }
    };

    const getUserData = async () => {
        if (dataLogin) {
            const url = `${api.url}/usuario/${dataLogin.usuario}?empresa=${dataLogin.empresa}`; 
            const headers = {
                'Authorization': `Bearer ${dataLogin.token}`, 
                'Content-Type': 'application/json'
            };
            const method = 'GET';
            await fetchDataUser(url, { headers, method });
            if (responseUser.data && dataLogin.usuario) {
                setUser(responseUser.data.user);
            }
        }
    };

    useEffect(() => {
        if(responseEmpresa.error || responseUser.error) logout();
        if (dataLogin && isAuthenticated) {
            getEmpresaData();
            getUserData();
            return 
        }
        logout();
    }, [dataLogin, isAuthenticated, !responseEmpresa.data, !responseUser.data, responseEmpresa.error, responseUser.error]);

    return (
      <AuthContext.Provider value={{ isAuthenticated, login, logout, dataLogin, user, empresa }}>
        {children}
      </AuthContext.Provider>
    );
};
