import "./App";
import "./../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Dashboard from "./components/Dashboard/Dashboard";
import Signin from "./components/Account/Signin";
import Signup from "./components/Account/Signup";
import { Route, Routes } from "react-router-dom";
import { UserContext } from "./contexts/UserContext";
import ProtectedRoutes from "./Services/ProtectedRoutes";
import { useState } from "react";
import NotFound from "./components/NotFound";
function App() {
  const [userData, setUserData] = useState([]);
  const createUser = (newUser) => {
    setUserData([...userData, newUser]);
  };
  return (
    <UserContext.Provider value={{ userData, createUser }}>
      <div className="App">
        <Routes>
          <Route path="*" element={<NotFound />} />

          <Route path="/" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<ProtectedRoutes />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
        </Routes>
      </div>
    </UserContext.Provider>
  );
}

export default App;
