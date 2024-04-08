import React from "react";
import { RouterProvider } from "react-router-dom";
import router from "./Router";

const App: React.FC = () => {
    return (
        <React.StrictMode>
            <RouterProvider router={router} />
        </React.StrictMode>
    );
    }

export default App;