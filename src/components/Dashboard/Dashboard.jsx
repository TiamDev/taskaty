import "./../../App.css";

import Sidebar from "./sidebar/Sidebar";
import TaskBox from "./taskbox/TaskBox";
import ProgressBox from "./progressbox/ProgressBox";

import { TaskContext } from "../../contexts/TaskContext";
import { SearchContext } from "../../contexts/SearchContext";
import { TypeContext } from "../../contexts/TypeContext";
import { SelectedDateContext } from "../../contexts/SelectedDate";
import { useContext, useState } from "react";

import { Tasks } from "../../Data/Tasks";
import { useLocation } from "react-router-dom";
import NotFound from "../NotFound";
function App() {
  const [displayType, setDisplayType] = useState("all");
  const [taskData, setTaskData] = useState(Tasks);
  const [search, setSearch] = useState("");
  const [date] = useState(new Date().toLocaleDateString());
  const [selectedDate, setSelectedDate] = useState(date);

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

  const dayName = getDayName(date);
  //

  const formatDate = (date) => {
    const options = { day: "numeric", month: "long", year: "numeric" };
    const formattedDate = new Date(date).toLocaleString("en-US", options);
    return formattedDate;
  };

  const formattedDate = formatDate(date);

  //
  const usersStorage = JSON.parse(localStorage.getItem("users")) || [];
  const user_id = useLocation();

  const user = usersStorage.find((u) => {
    return u.id === user_id.state;
  });
  if (user) {
    return (
      <>
        <SelectedDateContext.Provider value={{ selectedDate, setSelectedDate }}>
          <TypeContext.Provider value={{ displayType, setDisplayType }}>
            <TaskContext.Provider value={{ taskData, setTaskData }}>
              <div className="dashboard">
                <Sidebar user={user.username}></Sidebar>
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
                  <SearchContext.Provider value={{ search, setSearch }}>
                    <TaskBox user={user.id}></TaskBox>
                  </SearchContext.Provider>
                </div>
              </div>
            </TaskContext.Provider>
          </TypeContext.Provider>
        </SelectedDateContext.Provider>
      </>
    );
  } else {
    return <NotFound></NotFound>;
  }
}

export default App;
