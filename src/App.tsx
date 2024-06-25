import React from "react";
import { RouterProvider } from "react-router-dom";
import router from "./Router";
import { AppProvider } from "./Providers";

const App: React.FC = () => {
    return (
        <AppProvider> 
            <RouterProvider router={router} /> 
        </AppProvider>
    );
}

export default App;