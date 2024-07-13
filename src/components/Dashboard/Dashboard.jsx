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
  const [date, setDate] = useState(new Date().toLocaleDateString());
  const [selectedDate, setSelectedDate] = useState(date);

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
