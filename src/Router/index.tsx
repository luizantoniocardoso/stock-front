
import { createBrowserRouter } from "react-router-dom";
import "tw-elements-react/dist/css/tw-elements-react.min.css";
import {ProtectedRoute} from "./ProtectedRoute";
import { Login, Home, Register } from "@/Pages";
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
    }
  ]);

export default router;