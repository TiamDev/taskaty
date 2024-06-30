import React, { useContext, useState } from "react";
import "./taskbox.css";
import { v4 as uuidv4 } from "uuid";
import { TaskContext } from "../../../contexts/TaskContext";
import { Button, Modal } from "react-bootstrap";
const TaskBoxHeader = () => {
  // const user = JSON.parse(localStorage.getItem("user"));
  const { taskData, setTaskData } = useContext(TaskContext);
  const [showAdd, setShowAdd] = useState(false);

  const [addTask, setAddTask] = useState({
    title: "",
    description: "",
    startTime: "",
    endTime: "",
    date: "",
    priority: "necessary",
  });
  const handleAddClose = () => setShowAdd(false);
  const handleAddShow = () => setShowAdd(true);

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
    handleAddClose();
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
      <div className="taskbox__header">
        <div className="row">
          {" "}
          <div className="">
            <h1>Today Tasks</h1>
          </div>
        </div>
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
          <Modal.Title>New Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
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
              <legend className="col-form-label col-sm-2 pt-0">Priority</legend>
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
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleAddClose} className="btn btn-secondary">
            Close
          </Button>
          <Button onClick={handleAddTask} className="btn btn-primary">
            Create New Task
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default TaskBoxHeader;
