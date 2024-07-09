import { useAuth } from "@/Hooks"
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


export const PermissionRouter = ({ children }: {children: React.ReactNode}) => {
    const { user } = useAuth();
    const permissionAuth = user?.cargo?.nivel === 'ADMIN' ? true : false

    const navigate = useNavigate();

    useEffect(() => {
        if (!permissionAuth) {
            navigate('/home');
        }
        
    },[permissionAuth, navigate]);
    

    return permissionAuth ? children : null 
}