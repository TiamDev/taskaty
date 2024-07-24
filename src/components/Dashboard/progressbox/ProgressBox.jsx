import React, { useContext } from "react";
import "./progressbox.css";
import Progress from "./Progress";
import image from "./../../../assets/image/mochi-woman-reading-a-book-or-novel.png";
import { useTasks } from "../../../contexts/TaskContext";
import { CalenderSelectedDateContext } from "../../../contexts/CalenderSelectedDateContext";
import "react-circular-progressbar/dist/styles.css";
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";

const ProgressBox = ({ user }) => {
  const taskData = useTasks();
  const { calenderSelectedDate } = useContext(CalenderSelectedDateContext);

  const Tasks = taskData.filter((task) => {
    return task.date == calenderSelectedDate && task.user_id === user;
  });
  const CompletedTasks = Tasks.filter((task) => {
    return task.isComplete;
  });
  const UncompletedTasks = Tasks.filter((task) => {
    return !task.isComplete;
  });

  const necessaryDatacompleted = CompletedTasks.filter((task) => {
    return task.priority === "necessary";
  }).length;
  const necessaryData = Tasks.filter((task) => {
    return task.priority === "necessary";
  }).length;
  let necessary = 0;
  if (necessaryData > 0) {
    necessary = (necessaryDatacompleted / necessaryData) * 100;
  }
  //****************** */
  const importantDatacompleted = CompletedTasks.filter((task) => {
    return task.priority === "important";
  }).length;
  const importantData = Tasks.filter((task) => {
    return task.priority === "important";
  }).length;
  let important = 0;
  if (importantData > 0) {
    important = (importantDatacompleted / importantData) * 100;
  }
  /******************** */
  const normalDatacompleted = CompletedTasks.filter((task) => {
    return task.priority === "normal";
  }).length;
  const normalData = Tasks.filter((task) => {
    return task.priority === "normal";
  }).length;
  let normal = 0;
  if (normalData > 0) {
    normal = (normalDatacompleted / normalData) * 100;
  }
  const day =
    calenderSelectedDate === new Date().toLocaleDateString()
      ? "Today"
      : calenderSelectedDate;
  const completion =
    Tasks.length === 0
      ? ""
      : UncompletedTasks.length === 0
      ? ", all tasks have been completed. "
      : ` and  ${UncompletedTasks.length} incomplete tasks.`;
  return (
    <div className="progress__container">
      <div className="progressbox">
        <div className="row">
          <div className=" col-lg-2 col-sm-2 col-xs-12 d-lg-block  ">
            <img src={image} className="image" alt="" />
          </div>
          <div className="col-lg-10 col-sm-10 col-xs-12">
            <div className="progress__section row">
              <div className="col-lg-7 col-md-12 mb-2">
                <div className="daily">
                  <h5 className="selected__date ms-0">
                    {day} you have <strong>{Tasks.length} tasks </strong>
                    {completion}
                  </h5>
                  <div className="w-100">
                    <Progress
                      progress={CompletedTasks.length}
                      maxCompleted={Tasks.length}
                    ></Progress>
                  </div>
                </div>
              </div>
              <div className="col-lg-5 col-md-12 mt-2 ">
                <div className="row progresses">
                  <div className="row ms-1 text-start"></div>
                  <div className="col-4 circular__progress">
                    <CircularProgressbarWithChildren
                      value={necessary}
                      styles={buildStyles({
                        textSize: "16px",
                        pathColor: "#dc3545",
                        textColor: "black",
                        trailColor: "#e0e0de3b",
                      })}
                    >
                      <i className="bi bi-flag-fill  pe-1 necessary"></i>{" "}
                      <div style={{ fontSize: 12, marginTop: -5 }}>
                        <strong>{necessaryData}</strong> tasks
                      </div>
                    </CircularProgressbarWithChildren>
                  </div>
                  <div className="col-4 circular__progress">
                    <CircularProgressbarWithChildren
                      value={important}
                      styles={buildStyles({
                        textSize: "16px",
                        pathColor: "#3655b3",
                        textColor: "black",
                        trailColor: "#e0e0de3b",
                      })}
                    >
                      <i className="bi bi-flag-fill  pe-1 important"></i>{" "}
                      <div style={{ fontSize: 12, marginTop: -5 }}>
                        <strong>{importantData}</strong> tasks
                      </div>
                    </CircularProgressbarWithChildren>
                  </div>
                  <div className="col-4 circular__progress">
                    <CircularProgressbarWithChildren
                      value={normal}
                      styles={buildStyles({
                        textSize: "16px",
                        pathColor: "#ca62a9",
                        textColor: "black",
                        trailColor: "#e0e0de3b",
                      })}
                    >
                      <i className="bi bi-flag-fill  pe-1 normal"></i>{" "}
                      <div style={{ fontSize: 12, marginTop: -5 }}>
                        <strong>{normalData}</strong> tasks
                      </div>
                    </CircularProgressbarWithChildren>{" "}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProgressBox;
