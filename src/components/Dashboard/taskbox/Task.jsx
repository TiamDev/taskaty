import React, { useContext, useEffect, useState } from "react";
import "./taskbox.css";
import image from "./../../../assets/image/mochi-post-it-notes (1).png";
import image2 from "./../../../assets/image/mochi-exclamation-marks.png";

import { TaskContext } from "../../../contexts/TaskContext";
import { Modal, Button } from "react-bootstrap";
const Task = ({
  id,
  title = "task title",
  description = "description",
  date,
  startTime,
  endTime,
  priority = "important",
  isComplete,
}) => {
  const { taskData, setTaskData } = useContext(TaskContext);
  const [editTask, setEditTask] = useState({
    title: title,
    description: description,
    startTime: startTime,
    date: date,
    endTime: endTime,
    priority: priority,
  });

  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  // useEffect(() => {
  //   const storageTasks = JSON.parse(localStorage.getItem("tasks"));
  //   setTaskData(storageTasks);
  // }, []);
  const handleEditClose = () => setShowEdit(false);
  const handleDeleteClose = () => setShowDelete(false);

  const handleEditShow = () => setShowEdit(true);
  const handleDeleteShow = () => setShowDelete(true);

  const handleCheckClick = () => {
    const updatedTaskData = taskData.map((task) => {
      if (task.id === id) {
        task.isComplete = !task.isComplete;
      }
      return task;
    });
    setTaskData(updatedTaskData);
    localStorage.setItem("tasks", JSON.stringify(updatedTaskData));
  };
  const handleEditClick = () => {
    const updatedTasksData = taskData.map((task) => {
      if (task.id === id) {
        return {
          ...task,
          title: editTask.title,
          description: editTask.description,
          date: editTask.date,
          priority: editTask.priority,
          startTime: editTask.startTime,
          endTime: editTask.endTime,
        };
      }
      return task;
    });
    setTaskData(updatedTasksData);
    localStorage.setItem("tasks", JSON.stringify(updatedTasksData));

    handleEditClose();
  };
  const handleDeleteClick = () => {
    const updatedTasksData = taskData.filter((task) => {
      return task.id !== id;
    });
    handleDeleteClose();
    setTaskData(updatedTasksData);
    localStorage.setItem("tasks", JSON.stringify(updatedTasksData));
  };
  function convertTo12HourFormat(time24) {
    let [hours, minutes] = time24.split(":");
    let period = "AM";

    if (parseInt(hours) >= 12) {
      period = "PM";
    }

    if (parseInt(hours) > 12) {
      hours = (parseInt(hours) - 12).toString();
    } else if (parseInt(hours) === 0) {
      hours = "12";
    }

    return `${hours}:${minutes} ${period}`;
  }
  return (
    <>
      <div className={`card  mb-4 `}>
        <span className="col menu-box text-center">
          <div className="dropdown">
            <button
              className="dropdown-toggle "
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i className="bi bi-three-dots"></i>
            </button>
            <ul className="dropdown-menu dropdown-menu-dark">
              <li>
                <button className="dropdown-item " onClick={setShowEdit}>
                  <h6>Edit</h6>
                  <i className="bi bi-vector-pen"></i>
                </button>
              </li>
              <li>
                <button className="dropdown-item " onClick={setShowDelete}>
                  <h6>Delete</h6>
                  <i className="bi bi-trash3"></i>
                </button>
              </li>
            </ul>
          </div>
        </span>
        <div
          className={`card-body clickable-card  ${isComplete ? "checked" : ""}`}
          onClick={handleCheckClick}
        >
          <span className="done-box">
            <span className="done"></span>
          </span>

          <h5 className="card-title">
            <input
              type="checkbox"
              name="check"
              id="check"
              checked={isComplete}
              // onChange={() => {}}
              style={{ display: "none" }}
            />
            {title}
          </h5>
          <div className=" ps-4">
            {" "}
            <h6 className="card-text">{description}</h6>
            <div className="row">
              <span className={`priority ${priority}`}>
                <i className="bi bi-flag-fill  pe-1"></i>
                {priority}
              </span>
            </div>
            <div className="row">
              <span className="col time">
                {convertTo12HourFormat(startTime)} -{" "}
                {convertTo12HourFormat(endTime)}
              </span>
            </div>
          </div>
        </div>
      </div>
      {/* Edit Modal  */}
      <Modal
        show={showEdit}
        onHide={handleEditClose}
        className="modal fade "
        id="edit"
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <img src={image} width={"35rem"} className="me-3" alt="" />
            Edit Task
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mt-2">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              name="title"
              value={editTask.title}
              onChange={(e) =>
                setEditTask({ ...editTask, [e.target.name]: e.target.value })
              }
              className="form-control"
            />
          </div>
          <div className="mt-2">
            <label htmlFor="title">Description</label>
            <textarea
              className="form-control"
              value={editTask.description}
              name="description"
              onChange={(e) =>
                setEditTask({ ...editTask, [e.target.name]: e.target.value })
              }
            ></textarea>
          </div>
          <div className="row">
            <div className="col-lg-4 col-sm-12">
              <div className="">
                <label htmlFor="date">Date</label>
                <input
                  type="datetime-date"
                  name="date"
                  value={editTask.date}
                  onChange={(e) =>
                    setEditTask({
                      ...editTask,
                      [e.target.name]: e.target.value,
                    })
                  }
                  className="form-control"
                />
              </div>
            </div>
            <div className="col-lg-4 col-sm-6">
              <div className="mt-2">
                <label htmlFor="startTime">Starts</label>
                <input
                  type="time"
                  name="startTime"
                  value={editTask.startTime}
                  onChange={(e) =>
                    setEditTask({
                      ...editTask,
                      [e.target.name]: e.target.value,
                    })
                  }
                  className="form-control"
                />
              </div>
            </div>
            <div className="col-lg-4 col-sm-6">
              <div className="mt-2">
                <label htmlFor="title">Endes</label>
                <input
                  type="time"
                  name="endTime"
                  value={editTask.endTime}
                  onChange={(e) =>
                    setEditTask({
                      ...editTask,
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
                      editTask.priority === "necessary" ? "border__success" : ""
                    }`}
                  >
                    <label htmlFor="necessary">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="priority"
                        id="necessary"
                        value="necessary"
                        checked={editTask.priority === "necessary"}
                        onChange={(e) =>
                          setEditTask({
                            ...editTask,
                            [e.target.name]: e.target.value,
                          })
                        }
                      />
                      Necessary
                    </label>
                  </div>
                  <div
                    className={`form-check ${
                      editTask.priority === "important" ? "border__success" : ""
                    }`}
                  >
                    <label htmlFor="important">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="priority"
                        id="important"
                        value="important"
                        checked={editTask.priority === "important"}
                        onChange={(e) =>
                          setEditTask({
                            ...editTask,
                            [e.target.name]: e.target.value,
                          })
                        }
                      />
                      Important
                    </label>
                  </div>
                  <div
                    className={`form-check ${
                      editTask.priority === "normal" ? "border__success" : ""
                    }`}
                  >
                    <label htmlFor="normal">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="priority"
                        id="normal"
                        value="normal"
                        checked={editTask.priority === "normal"}
                        onChange={(e) =>
                          setEditTask({
                            ...editTask,
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
        <Modal.Footer>
          <Button onClick={handleEditClick} className="btn btn-primary">
            Save changes
          </Button>
        </Modal.Footer>
      </Modal>
      {/* Delete Modal  */}
      <Modal
        show={showDelete}
        onHide={handleDeleteClose}
        className="modal fade "
        id="delete"
      >
        <Modal.Header closeButton>
          <h1 className="modal-title fs-5" id="exampleModalLabel">
            <img src={image2} width={"30rem"} className="me-3" alt="" />
            Delete Task
          </h1>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete ?</Modal.Body>
        <Modal.Footer>
          <Button onClick={handleDeleteClick} className="btn btn-primary">
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default Task;
