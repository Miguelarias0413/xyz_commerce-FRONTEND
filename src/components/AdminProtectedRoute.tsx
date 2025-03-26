import useUser from "../hooks/useUser";
import { Navigate } from "react-router";

function AdminProtectedRoute({ children }: { children: React.ReactNode }) {
    const { isAdmin} = useUser();

    if (!isAdmin) {
        
        return <Navigate to="/authenticate" />;
    }
 
  

    return <>{children}</>;
}


export default AdminProtectedRoute;
