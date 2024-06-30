import "./../../App.css";

import Sidebar from "./sidebar/Sidebar";
import TaskBox from "./taskbox/TaskBox";
import ProgressBox from "./progressbox/ProgressBox";

import { Route, Routes } from "react-router-dom";
import { TaskContext } from "../../contexts/TaskContext";
import Task from "./taskbox/Task";
import { useState } from "react";
import { Tasks } from "../../Data/Tasks";
function App() {
  const [taskData, setTaskData] = useState(Tasks);
  // localStorage.setItem("tasks", JSON.stringify(taskData));

  // const createTask = (newTask) => {
  //   setTaskData([...taskData, newTask]);
  // };
  return (
    <>
      <TaskContext.Provider value={{ taskData, setTaskData }}>
        <div className="dashboard">
          <Sidebar></Sidebar>
          <div className="content">
            <ProgressBox></ProgressBox>
            {/* <Header></Header> */}
            <TaskBox></TaskBox>
          </div>
        </div>
      </TaskContext.Provider>
    </>
  );
}

export default App;
