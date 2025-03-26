import useUser from "../hooks/useUser";
import { Navigate } from "react-router";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const { isAuthenticated} = useUser();

    if (!isAuthenticated) {
        
        return <Navigate to="/authenticate" />;
    }
 
  

    return <>{children}</>;
}


export default ProtectedRoute;
