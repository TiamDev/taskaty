import "./../../App.css";

import Sidebar from "./sidebar/Sidebar";
import TaskBox from "./taskbox/TaskBox";
import ProgressBox from "./progressbox/ProgressBox";
import "./dashboard.css";
import { TaskContext } from "../../contexts/TaskContext";
import { SearchContext } from "../../contexts/SearchContext";
import { TypeContext } from "../../contexts/TypeContext";
import { SelectedDateContext } from "../../contexts/SelectedDate";
import { useContext, useState } from "react";
import userImg from "./../../assets/image/mochi-successful-man-head-with-glasses.png";
import { Tasks } from "../../Data/Tasks";
import { useLocation } from "react-router-dom";
function App() {
  const [displayType, setDisplayType] = useState("all");
  const [taskData, setTaskData] = useState(Tasks);
  const [search, setSearch] = useState("");
  const [date, setDate] = useState(new Date().toLocaleDateString());
  const [selectedDate, setSelectedDate] = useState(date);

  const usersStorage = JSON.parse(localStorage.getItem("users")) || [];

  const user_id = useLocation();

  const user = usersStorage.find((u) => {
    return u.id === user_id.state;
  });
  const day =
    selectedDate === new Date().toLocaleDateString() ? "Today" : selectedDate;
  return (
    <>
      <SelectedDateContext.Provider value={{ selectedDate, setSelectedDate }}>
        <TypeContext.Provider value={{ displayType, setDisplayType }}>
          <TaskContext.Provider value={{ taskData, setTaskData }}>
            <div className="dashboard">
              <div className="header row">
                <div className="user col-6">
                  <h3>Hi, {user.username}</h3>
                </div>
                <div className="col-6">
                  <h3 className="mb-0 schedule">
                    <span>{day}</span> Schedule
                  </h3>
                </div>
              </div>{" "}
              <Sidebar user={user.username}></Sidebar>
              <div className="row tasks-contener">
                <div className="col-lg-9">
                  <div className="content">
                    <ProgressBox user={user.id}></ProgressBox>
                    <SearchContext.Provider value={{ search, setSearch }}>
                      <TaskBox user={user.id}></TaskBox>
                    </SearchContext.Provider>
                  </div>
                </div>
                <div className="col-lg-3">kjlkfjglkd</div>
              </div>
            </div>
          </TaskContext.Provider>
        </TypeContext.Provider>
      </SelectedDateContext.Provider>
    </>
  );
}

export default App;
