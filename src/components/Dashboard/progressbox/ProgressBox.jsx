import React, { useContext } from "react";
import "./progressbox.css";
import Progress from "./Progress";
import image from "./../../../assets/image/mochi-woman-reading-a-book-or-novel.png";
import { TaskContext } from "../../../contexts/TaskContext";
import { SelectedDateContext } from "../../../contexts/SelectedDate";
import "react-circular-progressbar/dist/styles.css";
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";

const ProgressBox = ({ user }) => {
  const { taskData } = useContext(TaskContext);
  const { selectedDate } = useContext(SelectedDateContext);

  const Tasks = taskData.filter((task) => {
    return task.date == selectedDate && task.user_id === user;
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
    selectedDate === new Date().toLocaleDateString() ? "Today" : selectedDate;
  const completion =
    UncompletedTasks.length === 0 ? " 0 🎉 " : UncompletedTasks.length;
  return (
    <>
      <div className="progress__container">
        <div className="progressbox">
          <div className="row ">
            <div className="col-12">
              <div className="row">
                <div className="col-12">
                  <div className="progress__section row">
                    <div className="col-lg-8 col-md-10 mb-2">
                      <div className="row">
                        <div className="col-2 ">
                          <img src={image} className="image" alt="" />
                        </div>
                        <div className="col-10">
                          {" "}
                          <div className="daily">
                            <h2 className="mb-0">{day} Tasks Progress</h2>
                            <h4 className="selected__date m-0">
                              Remaining : <strong>{completion}</strong>{" "}
                            </h4>
                            <p className="m-0 ps-1">
                              All Tasks : {Tasks.length}
                            </p>
                            <div className="w-100">
                              <Progress
                                progress={CompletedTasks.length}
                                maxCompleted={Tasks.length}
                              ></Progress>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* <div className="col-lg-4 col-md-4 mt-2 ">
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
                              pathColor: "#616060",
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
                    </div> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default ProgressBox;
