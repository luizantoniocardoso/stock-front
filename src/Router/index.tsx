
import { createBrowserRouter } from "react-router-dom";
import "tw-elements-react/dist/css/tw-elements-react.min.css";
import {ProtectedRoute} from "./ProtectedRoute";
import { Login, Home, Register, CadastroCargo, CadastroEstoque, Perfil, CadastroUsers, CadastroProduto, CadastroCategoria, CadastroFornecedor, CadastroLote, CadastroEntradaSaida } from "@/Pages";
import { MainLayout } from "@/Layouts/MainLayout";
import { PermissionRouter } from "./PermissionRouter";

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
      path: "/fornecedor",
      element: <ProtectedRoute><MainLayout><CadastroFornecedor/></MainLayout></ProtectedRoute>
    },
    {
      path: "/lote",
      element: <ProtectedRoute><MainLayout><CadastroLote/></MainLayout></ProtectedRoute>
    },
    {
      path: '/entrada-saida',
      element: <ProtectedRoute><MainLayout><CadastroEntradaSaida/></MainLayout></ProtectedRoute>
    },
    {
      path: "/users",
      element: <ProtectedRoute><PermissionRouter><MainLayout><CadastroUsers/></MainLayout></PermissionRouter></ProtectedRoute>
    },
    {
      path: "/cargo",
      element: <ProtectedRoute><PermissionRouter><MainLayout><CadastroCargo/></MainLayout></PermissionRouter></ProtectedRoute>
    },
    {
      path: "/profile",
      element: <ProtectedRoute><MainLayout><Perfil/></MainLayout></ProtectedRoute>
    }

  ]);

export default router;