import React, { useState } from "react";
import "./sidebar.css";
import logo from "./../../../assets/image/logo.png";
import pic from "./../../../assets/image/mochi-jolly-young-man-and-woman.png";
import Calendar from "./Calendar";
import { Route, Routes, Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../../contexts/UserContext";
import { useContext } from "react";
import { useParams } from "react-router-dom";
const Sidebar = () => {
  const [toggle, showMenu] = useState(false);
  // const users = useContext(UserContext);
  // const { id } = useParams();
  // const user = users.find((u) => {
  //   return u.id == id;
  // });
  const navigat = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const handleLogout = () => {
    localStorage.removeItem("loggedin");
    localStorage.removeItem("user");

    navigat("/");
  };
  return (
    <>
      <aside className={toggle ? "sidebar show-menu" : "sidebar"}>
        <img src={logo} className="logo" alt="" />
        <div className="side-content">
          <Calendar></Calendar>
          <div className={"profile center"}>
            <img src={pic} alt="" />
            <p> Hi, {user.username}</p>
            <button
              type="button"
              onClick={handleLogout}
              className="btn btn-danger w-100"
            >
              <i className="bi bi-arrow-bar-left"></i> logout
            </button>
          </div>
        </div>
      </aside>
      <div
        className={toggle ? "nav__toggle nav__toggle-open" : "nav__toggle"}
        onClick={() => showMenu(!toggle)}
      >
        <i className="bi bi-list"></i>
      </div>
    </>
  );
};
export default Sidebar;
