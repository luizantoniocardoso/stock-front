
import { createBrowserRouter } from "react-router-dom";
import "tw-elements-react/dist/css/tw-elements-react.min.css";
import {ProtectedRoute} from "./ProtectedRoute";
import { Login, Home, Register } from "@/Pages";

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