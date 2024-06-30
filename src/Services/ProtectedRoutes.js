import React from "react";
import { Outlet, Navigate } from "react-router-dom";
function ProtectedRoutes() {
  const auth = localStorage.getItem("loggedin");
  return auth ? <Outlet /> : <Navigate to={"/"} />;
}

export default ProtectedRoutes;
