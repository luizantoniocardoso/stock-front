import { createContext } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (data: DataAuth) => void;
  logout: () => void;
  dataLogin: DataAuth | null;
}

interface DataAuth {
  menssage: string ;
  token: string ;
  empresa: number ;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);