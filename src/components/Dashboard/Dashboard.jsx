import "./../../App.css";

import Sidebar from "./sidebar/Sidebar";
import TaskBox from "./taskbox/TaskBox";
import ProgressBox from "./progressbox/ProgressBox";
import NotFound from "../NotFound";
import TaskProvider from "../../contexts/TaskContext";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useTasks } from "../../contexts/TaskContext";
import { CalenderSelectedDateContext } from "../../contexts/CalenderSelectedDateContext";
import { ToastProvider } from "../../contexts/ToastContext";

function Dashboard() {
  const [date] = useState(new Date().toLocaleDateString());
  const [calenderSelectedDate, setCalenderSelectedDate] = useState(date);
  const getDayName = (date) => {
    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const dayIndex = new Date(date).getDay();
    return daysOfWeek[dayIndex];
  };
  const formatDate = (date) => {
    const options = { day: "numeric", month: "long", year: "numeric" };
    const formattedDate = new Date(date).toLocaleString("en-US", options);
    return formattedDate;
  };
  const formattedDate = formatDate(date);
  const dayName = getDayName(date);

  const usersStorage = JSON.parse(localStorage.getItem("users")) || [];
  const user_id = useLocation();

  const user = usersStorage.find((u) => {
    return u.id === user_id.state;
  });
  if (user) {
    return (
      <>
        <CalenderSelectedDateContext.Provider
          value={{ calenderSelectedDate, setCalenderSelectedDate }}
        >
          <TaskProvider>
            <div className="dashboard">
              <Sidebar user={user}></Sidebar>
              <div className="content">
                <div className="row user-info">
                  <div className="col-6">
                    <h4 className="mt-1">Hi, {user.username}</h4>
                  </div>
                  <div className="col-6 text-end">
                    <div className="time-info">
                      <h4 className="m-0">
                        <strong>{formattedDate}</strong>
                      </h4>
                      <p className="day-name">{dayName}</p>
                    </div>
                  </div>
                </div>
                <ProgressBox user={user.id}></ProgressBox>
                <ToastProvider>
                  <TaskBox user={user.id}></TaskBox>
                </ToastProvider>
              </div>
            </div>
          </TaskProvider>
        </CalenderSelectedDateContext.Provider>
      </>
    );
  } else {
    return <NotFound></NotFound>;
  }
}

export default Dashboard;
