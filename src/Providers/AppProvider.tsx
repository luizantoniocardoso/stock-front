import React from 'react';
import { AuthProvider } from './AuthProvider';
import { AlertProvider } from './AlertProvider';

export const AppProvider = ({children}: { children: React.ReactNode}) => {
    return <AlertProvider><AuthProvider>{children}</AuthProvider></AlertProvider>;
}
