import { Auth, Empresa, User } from '@/Interfaces/Api';
import { createContext } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (data: Auth) => void;
  logout: () => void;
  dataLogin: Auth | null;
  empresa: Empresa | null;
  user: User | null;
}


export const AuthContext = createContext<AuthContextType | undefined>(undefined);