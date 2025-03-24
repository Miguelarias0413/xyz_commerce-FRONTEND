import { Routes,Route } from "react-router";
import useUser from "./hooks/useUser";
import Authenticate from "./pages/Authenticate"
import Landing from "./pages/Landing";
function App() {

  const {isAuthenticated} = useUser()
  return (
    <Routes>
      <Route index path="/" element={isAuthenticated ? <Landing/> : <Authenticate />}></Route>
    </Routes>
  );
}

export default App;
