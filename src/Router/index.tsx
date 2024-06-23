
import { createBrowserRouter } from "react-router-dom";
import { Login } from "../Pages/Login";
import "tw-elements-react/dist/css/tw-elements-react.min.css";
import { Register } from "@/Pages/Register";
import { Home } from "@/Pages/Home";
import {ProtectedRoute} from "./ProtectedRoute";


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
      element: <ProtectedRoute><Home /></ProtectedRoute>
    }
  ]);

export default router;