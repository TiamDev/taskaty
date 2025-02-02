import React, { useState } from "react";
import logo from "./../../../assets/image/Logo.svg";
import pic from "./../../../assets/image/mochi-jolly-young-man-and-woman.png";
import "./calender.css";
import Calendar from "react-calendar";
import "./sidebar.css";

// import Calendar from "./Calendar";

import { useNavigate } from "react-router-dom";

import { useContext } from "react";
import { CalenderSelectedDateContext } from "../../../contexts/CalenderSelectedDateContext";
const Sidebar = ({ user }) => {
  const [toggle, showMenu] = useState(false);
  const { calenderSelectedDate, setCalenderSelectedDate } = useContext(
    CalenderSelectedDateContext
  );
  const navigat = useNavigate();
  const handleLogout = () => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const UpdateUser = users.map((u) => {
      if (u.id === user.id) {
        return {
          ...u,
          loggedin: false,
        };
      }
      return u;
    });
    localStorage.setItem("users", JSON.stringify(UpdateUser));
    navigat("/");
  };
  return (
    <>
      <aside className={toggle ? "sidebar show-menu" : "sidebar"}>
        <img src={logo} className="logo" alt="" />
        <div className="side-content">
          <Calendar
            onClickDay={(e) => {
              setCalenderSelectedDate(e.toLocaleDateString());
            }}
            value={calenderSelectedDate}
          />
          <div className={"profile center"}>
            <img src={pic} alt="" />
            <button
              type="button"
              onClick={handleLogout}
              className="btn btn-primary w-75"
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
