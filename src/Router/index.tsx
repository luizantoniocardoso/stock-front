
import {
  createBrowserRouter,
} from "react-router-dom";
import { Login } from "../pages/Login";
import "tw-elements-react/dist/css/tw-elements-react.min.css";
import { Home } from "../pages/Home";

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
      path: "/home",
      element: <MainLayout><Home/></MainLayout>,
    }
  ]);

export default router;