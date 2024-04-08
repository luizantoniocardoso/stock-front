
import {
  createBrowserRouter,
} from "react-router-dom";
import { Login } from "../pages/Login";
import "tw-elements-react/dist/css/tw-elements-react.min.css";



  const router = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
  ]);

export default router;