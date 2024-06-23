import { api } from '@/Enviroments';
import { createContext, useState, ReactNode } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (data: DataAuth) => void;
  logout: () => void;
  data: DataAuth;
}

interface DataAuth {
  menssage: string;
  token: string;
  empresa: number;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [data, setData] = useState<DataAuth>({} as DataAuth);

  api.token = data.token; 

  const login = ( data: DataAuth ) => {
    setData(data);
    console.log(data);
    setIsAuthenticated(true);
  }
  
  const logout = () => {
    setData({} as DataAuth);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, data }}>
      {children}
    </AuthContext.Provider>

  );
};

