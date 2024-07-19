import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

function ProtectedRoutes() {
  const user_id = useLocation();
  const users = JSON.parse(localStorage.getItem("users")) || [];

  const user = users.find((u) => {
    return u.id === user_id.state;
  });
  const authUser = user.loggedin;
  return authUser ? <Outlet /> : <Navigate to={"/"} />;
}

export default ProtectedRoutes;
