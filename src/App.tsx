import { Routes, Route, Navigate } from "react-router";
import useUser from "./hooks/useUser";
import Authenticate from "./pages/Authenticate";
import Landing from "./pages/Landing";
import ProtectedRoute from "./components/ProtectedRoute";
import { useEffect } from "react";
import AdminProtectedRoute from "./components/AdminProtectedRoute";
import Dashboard from "./pages/Dashboard";
function App() {
  const { checkAuthStatus  } = useUser();
  useEffect(() => {
    checkAuthStatus();
  }, []);
  return (
    <Routes>
        <Route path="/" element={<Navigate to="/landing" replace  />}/>
        <Route index path="/landing" element={<ProtectedRoute>  <Landing  /></ProtectedRoute>}></Route>
        <Route path="/dashboard" element={<AdminProtectedRoute><Dashboard/> </AdminProtectedRoute>} />

      <Route path="/authenticate" element={<Authenticate />} />
    </Routes>
  );
}

export default App;
