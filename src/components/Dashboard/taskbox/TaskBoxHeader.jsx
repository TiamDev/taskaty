import React, { useContext, useEffect, useState } from "react";
import "./taskbox.css";
import image from "./../../../assets/image/mochi-confused-thoughts-icon.png";

import { v4 as uuidv4 } from "uuid";
import { TaskContext } from "../../../contexts/TaskContext";
import { Button, Modal } from "react-bootstrap";
import { TypeContext } from "../../../contexts/TypeContext";
import {
  PriorityContext,
  SearchContext,
} from "../../../contexts/SearchContext";
const TaskBoxHeader = ({ user }) => {
  const { taskData, setTaskData } = useContext(TaskContext);
  const [showAdd, setShowAdd] = useState(false);
  const [date, setdate] = useState(new Date());

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const [addTask, setAddTask] = useState({
    title: "",
    description: "",
    startTime: "",
    endTime: "",
    date: formatDate(new Date()),
    priority: "necessary",
  });

  const handleAddClose = () => setShowAdd(false);
  const handleAddShow = () => setShowAdd(true);
  const handleAddTask = () => {
    const newTask = {
      id: uuidv4(),
      user_id: user,
      isComplete: false,
      title: addTask.title,
      description:
        addTask.description == "" ? "no description" : addTask.description,
      startTime: addTask.startTime,
      endTime: addTask.endTime,
      date: new Date(addTask.date).toLocaleDateString(),
      priority: addTask.priority,
    };
    const createTask = [...taskData, newTask];
    setTaskData(createTask);
    localStorage.setItem("tasks", JSON.stringify(createTask));
    handleAddClose();
    setAddTask({
      title: "",
      description: "",
      startTime: "",
      endTime: "",
      date: "",
      priority: "necessary",
    });
  };
  useEffect(() => {
    const storageTask = localStorage.getItem("tasks");
    if (storageTask) {
      try {
        const storageTodo = JSON.parse(storageTask);
        setTaskData(storageTodo);
      } catch (error) {
        console.error("Error parsing localStorage data:", error);
        setTaskData([]);
      }
    } else {
      setTaskData([]);
    }
  }, []);
  const { displayType, setDisplayType } = useContext(TypeContext);

  const changeDisplyType = (e) => {
    setDisplayType(e);
  };
  const { setSearch } = useContext(SearchContext);

  return (
    <>
      <div className="taskbox__header">
        <div className="row">
          {" "}
          <div className="">
            <h1> Tasks</h1>
          </div>
        </div>
        <div className="row">
          <div className="col-5">
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="search"
                aria-label="search"
                aria-describedby="basic-addon2"
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
              />
              <span className="input-group-text" id="basic-addon2">
                <i className="bi bi-search"></i>
              </span>
            </div>
          </div>
          <div className="col-5 d-flex">
            <div className="dropdown pe-3">
              <button
                className="dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {displayType}
              </button>
              <ul className="dropdown-menu dropdown-menu-dark">
                <li>
                  <Button
                    className="dropdown__btn"
                    value={"all"}
                    onClick={(e) => {
                      changeDisplyType(e.target.value);
                    }}
                  >
                    all
                  </Button>
                </li>
                <li>
                  <Button
                    className="dropdown__btn"
                    value={"Completed"}
                    onClick={(e) => {
                      changeDisplyType(e.target.value);
                    }}
                  >
                    Completed
                  </Button>{" "}
                </li>
                <li>
                  <Button
                    className="dropdown__btn"
                    value={"Uncompleted"}
                    onClick={(e) => {
                      changeDisplyType(e.target.value);
                    }}
                  >
                    Uncompleted
                  </Button>
                </li>
              </ul>
            </div>
          </div>

          <div className="col-2 text-end">
            <Button
              className={"btn btn-primary btn-add"}
              onClick={handleAddShow}
            >
              <i className="bi bi-plus-square-fill "></i>
            </Button>
          </div>
        </div>
      </div>
      {/*  Modal  */}
      <Modal show={showAdd} onHide={handleAddClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            <img src={image} width={"35rem"} className="me-3" alt="" />
            New Task
          </Modal.Title>
        </Modal.Header>
        <div className="row">
          <div className="col-6">
            <Modal.Body>
              <div className="mt-2 ">
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
                      onChange={(e) => {
                        setAddTask({
                          ...addTask,
                          [e.target.name]: e.target.value,
                        });
                      }}
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
                  <label className=" ">Priority</label>
                  <div className="col-sm-10  mt-2">
                    <div className="d-flex justify-content-between">
                      <div
                        className={`form-check  ${
                          addTask.priority === "necessary"
                            ? "border__success"
                            : ""
                        }`}
                      >
                        <label htmlFor="necessary">
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
                          />
                          Necessary
                        </label>
                      </div>
                      <div
                        className={`form-check ${
                          addTask.priority === "important"
                            ? "border__success"
                            : ""
                        }`}
                      >
                        <label htmlFor="important">
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
                          Important
                        </label>
                      </div>
                      <div
                        className={`form-check ${
                          addTask.priority === "normal" ? "border__success" : ""
                        }`}
                      >
                        <label htmlFor="normal">
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
                          Normal
                        </label>
                      </div>
                    </div>
                  </div>
                </fieldset>
              </div>
            </Modal.Body>
          </div>
          <div className="col-6">
            <img src={image} width={"80rem"} className="me-3" alt="" />
          </div>
        </div>
        <Modal.Footer>
          <Button
            onClick={handleAddTask}
            disabled={
              addTask.title === "" ||
              addTask.startTime === "" ||
              addTask.endTime === "" ||
              addTask.date === "" ||
              addTask.priority === ""
            }
            className="btn btn-primary"
          >
            Create New Task
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default TaskBoxHeader;
