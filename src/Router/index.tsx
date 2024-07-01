
import { createBrowserRouter } from "react-router-dom";
import "tw-elements-react/dist/css/tw-elements-react.min.css";
import {ProtectedRoute} from "./ProtectedRoute";
import { Login, Home, Register, CadastroEstoque, Perfil, CadastroUsers, CadastroProduto, CadastroCategoria } from "@/Pages";
import { MainLayout } from "@/Layouts/MainLayout";

  const router = createBrowserRouter([
    {
      path: "/",
      element:  <Login />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    
    { 
      path: "/home",
      element: <ProtectedRoute><MainLayout><Home/></MainLayout></ProtectedRoute>
    },
    {
      path: "/estoque",
      element: <ProtectedRoute><MainLayout><CadastroEstoque/></MainLayout></ProtectedRoute>
    },
    {
      path: "/produto",
      element: <ProtectedRoute><MainLayout><CadastroProduto/></MainLayout></ProtectedRoute>
    },
    {
      path: "/categoria",
      element: <ProtectedRoute><MainLayout><CadastroCategoria/></MainLayout></ProtectedRoute>
    },
    {
      path: "/users",
      element: <ProtectedRoute><MainLayout><CadastroUsers/></MainLayout></ProtectedRoute>
    },
    {
      path: "/profile",
      element: <ProtectedRoute><MainLayout><Perfil/></MainLayout></ProtectedRoute>
    }

  ]);

export default router;