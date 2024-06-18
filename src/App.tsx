import React from "react";
import { RouterProvider } from "react-router-dom";
import router from "./Router";
import { AuthProvider } from "./Contexts";

const App: React.FC = () => {
    return (
        <AuthProvider> 
            <RouterProvider router={router} /> 
        </AuthProvider>
    );
}

export default App;