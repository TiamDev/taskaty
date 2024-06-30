import React, { useContext, useState } from "react";
import "./taskbox.css";
import TaskBoxHeader from "./TaskBoxHeader";
import Task from "./Task";
import { TaskContext } from "../../../contexts/TaskContext";
const TaskBox = () => {
  const { taskData } = useContext(TaskContext);

  let taskList = taskData.map((task) => {
    return (
      <div className="col-lg-4 col-md-4 col-sm-2  " key={task.id}>
        <Task
          key={task.id}
          id={task.id}
          title={task.title}
          description={task.description}
          priority={task.priority}
          startTime={task.startTime}
          endTime={task.endTime}
          isComplete={task.isComplete}
        ></Task>
      </div>
    );
  });
  return (
    <>
      <TaskBoxHeader></TaskBoxHeader>
      <div className="row scroller">{taskList}</div>
    </>
  );
};
export default TaskBox;
