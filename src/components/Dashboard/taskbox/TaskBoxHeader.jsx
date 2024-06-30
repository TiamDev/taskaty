import React, { useContext, useState } from "react";
import "./taskbox.css";
import { v4 as uuidv4 } from "uuid";
import { TaskContext } from "../../../contexts/TaskContext";
const TaskBoxHeader = () => {
  // const user = JSON.parse(localStorage.getItem("user"));
  const { taskData, setTaskData } = useContext(TaskContext);

  const [addTask, setAddTask] = useState({
    title: "",
    description: "",
    startTime: "",
    endTime: "",
    date: "",
    priority: "necessary",
  });
  const handleAddTask = () => {
    const newTask = {
      id: uuidv4(),
      user_id: 3,
      isComplete: false,
      title: addTask.title,
      description: addTask.description,
      startTime: "6:00 am",
      endTime: "9:00 pm",
      date: addTask.date,
      priority: addTask.priority,
    };
    const createTask = [...taskData, newTask];
    setTaskData(createTask);
    localStorage.setItem("tasks", JSON.stringify(createTask));
    setAddTask({
      title: "",
      description: "",
      startTime: "",
      endTime: "",
      date: "",
      priority: "",
    });
  };
  return (
    <>
      <div className="taskbox">
        <div className="row">
          <div className="col-4">
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="search"
                aria-label="search"
                aria-describedby="basic-addon2"
              />
              <span className="input-group-text" id="basic-addon2">
                <i className="bi bi-search"></i>
              </span>
            </div>
          </div>
          <div className="col-4 d-flex">
            <div className="dropdown pe-3">
              <button
                className="dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Status
              </button>
              <ul className="dropdown-menu dropdown-menu-dark">
                <li>
                  <a className="dropdown-item " href="#">
                    all
                  </a>
                </li>
                <li>
                  <a className="dropdown-item " href="#">
                    Completed
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Uncompleted
                  </a>
                </li>
              </ul>
            </div>
            <div className="dropdown">
              <button
                className="dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Priority
              </button>
              <ul className="dropdown-menu dropdown-menu-dark">
                <li className="dropdown-item active">
                  {/* <a className="dropdown-item active " href="#"> */}
                  <i className="bi bi-flag-fill necessary pe-1"></i> Necessary
                  {/* </a> */}
                </li>
                <li className="dropdown-item ">
                  {/* <a className="dropdown-item active " href="#"> */}
                  <i className="bi bi-flag-fill important pe-1"></i> Important
                  {/* </a> */}
                </li>
                <li className="dropdown-item ">
                  {/* <a className="dropdown-item active " href="#"> */}
                  <i className="bi bi-flag-fill normal pe-1"></i> Normal
                  {/* </a> */}
                </li>
              </ul>
            </div>
          </div>

          <div className="col-4 text-end">
            <button
              type="button"
              className={"btn btn-primary"}
              data-bs-toggle="modal"
              data-bs-target="#staticBackdrop"
            >
              <i className="bi bi-plus-square-fill pe-2"></i>
              New Task
            </button>
          </div>
        </div>
      </div>
      {/*  Modal  */}
      <div
        className="modal fade "
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        // tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">
                New Task
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="mt-2">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  value={addTask.title}
                  onChange={(e) =>
                    setAddTask({ ...addTask, [e.target.name]: e.target.value })
                  }
                  name="title"
                  className="form-control"
                />
              </div>
              <div className="mt-2">
                <label htmlFor="description">Description</label>
                <textarea
                  className="form-control"
                  name="description"
                  value={addTask.description}
                  onChange={(e) =>
                    setAddTask({ ...addTask, [e.target.name]: e.target.value })
                  }
                ></textarea>
              </div>
              <div className="row mt-2">
                <div className="col-lg-4 col-sm-12">
                  <div className="">
                    <label htmlFor="title">Date</label>
                    <input
                      type="date"
                      name="date"
                      value={addTask.date}
                      onChange={(e) =>
                        setAddTask({
                          ...addTask,
                          [e.target.name]: e.target.value,
                        })
                      }
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="col-lg-4 col-sm-6">
                  <div className="">
                    <label htmlFor="title">Starts</label>
                    <input
                      type="time"
                      name="startTime"
                      value={addTask.startTime}
                      onChange={(e) =>
                        setAddTask({
                          ...addTask,
                          [e.target.name]: e.target.value,
                        })
                      }
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="col-lg-4 col-sm-6">
                  <div className="">
                    <label htmlFor="title">Endes</label>
                    <input
                      type="time"
                      value={addTask.endTime}
                      name="endTime"
                      onChange={(e) =>
                        setAddTask({
                          ...addTask,
                          [e.target.name]: e.target.value,
                        })
                      }
                      className="form-control"
                    />
                  </div>
                </div>
                <fieldset className="row mb-3 mt-2">
                  <legend className="col-form-label col-sm-2 pt-0">
                    Priority
                  </legend>
                  <div className="col-sm-10">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="priority"
                        id="necessary"
                        value="necessary"
                        checked={addTask.priority === "necessary"}
                        onChange={(e) =>
                          setAddTask({
                            ...addTask,
                            [e.target.name]: e.target.value,
                          })
                        }
                        // checked=""
                      />
                      <label className="form-check-label" htmlFor="gridRadios1">
                        Necessary
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="priority"
                        id="important"
                        value="important"
                        checked={addTask.priority === "important"}
                        onChange={(e) =>
                          setAddTask({
                            ...addTask,
                            [e.target.name]: e.target.value,
                          })
                        }
                      />
                      <label className="form-check-label" htmlFor="gridRadios2">
                        Important
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="priority"
                        id="normal"
                        value="normal"
                        checked={addTask.priority === "normal"}
                        onChange={(e) =>
                          setAddTask({
                            ...addTask,
                            [e.target.name]: e.target.value,
                          })
                        }
                      />
                      <label className="form-check-label" htmlFor="gridRadios2">
                        Normal
                      </label>
                    </div>
                  </div>
                </fieldset>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                onClick={handleAddTask}
                className="btn btn-primary"
                data-bs-dismiss="modal"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default TaskBoxHeader;
