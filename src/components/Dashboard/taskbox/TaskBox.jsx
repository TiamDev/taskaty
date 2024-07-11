import React, { useContext, useState, useEffect } from "react";
import "./taskbox.css";
import TaskBoxHeader from "./TaskBoxHeader";
import Task from "./Task";
import { TaskContext } from "../../../contexts/TaskContext";
import { TypeContext } from "../../../contexts/TypeContext";

import { SelectedDateContext } from "../../../contexts/SelectedDate";
import { SearchContext } from "../../../contexts/SearchContext";

const TaskBox = ({ user }) => {
  const { selectedDate } = useContext(SelectedDateContext);
  const { displayType } = useContext(TypeContext);
  const { search, setSearch } = useContext(SearchContext);

  const { taskData } = useContext(TaskContext);
  const completedTask = taskData.filter((task) => {
    return task.isComplete && task.date == selectedDate && task.user_id == user;
  });
  const uncompletedTask = taskData.filter((task) => {
    return (
      !task.isComplete && task.date == selectedDate && task.user_id == user
    );
  });

  let taskToBeRendered = taskData;
  if (displayType == "Completed") {
    taskToBeRendered = completedTask;
  } else if (displayType == "Uncompleted") {
    taskToBeRendered = uncompletedTask;
  } else {
    taskToBeRendered = taskData.filter((task) => {
      return task && task.date == selectedDate && task.user_id == user;
    });
  }

  let taskList = taskToBeRendered
    .filter((task) => {
      return search === "" ? task : task.title.includes(search);
    })
    .map((task) => {
      return (
        <div className="col-lg-4 col-md-4 col-sm-2 taskbox " key={task.id}>
          <Task
            key={task.id}
            id={task.id}
            title={task.title}
            date={task.date}
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
      <TaskBoxHeader user={user}></TaskBoxHeader>
      {taskList.length === 0 ? (
        <div className="row scroller">
          <p className="empty">There are no tasks</p>
        </div>
      ) : (
        <div className="row scroller">{taskList}</div>
      )}
    </>
  );
};
export default TaskBox;
