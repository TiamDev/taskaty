import React, { useContext, useState } from "react";
import "./taskbox.css";
import { TaskContext } from "../../../contexts/TaskContext";
// import Button from "react-bootstrap/Button";
import { Modal, Button } from "react-bootstrap";
import { data } from "jquery";
const Task = ({
  id,
  title = "task title",
  description = "description",
  date,
  startTime = "8:00 am",
  endTime = "9:00 pm",
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
  };
  const handleEditClick = () => {
    const updatedTasksData = taskData.map((task) => {
      if (task.id == id) {
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
    handleEditClose();
  };
  const handleDeleteClick = () => {
    const updatedTasksData = taskData.filter((task) => {
      return task.id !== id;
    });
    setTaskData(updatedTasksData);
  };
  return (
    <>
      <div
        className={`card  mb-4 clickable-card  ${isComplete ? "checked" : ""}`}
      >
        <div className={`card-body `} onClick={handleCheckClick}>
          <span className="done-box">
            <span className="done"></span>
          </span>

          <h5 className="card-title">
            <input
              type="checkbox"
              name="check"
              id="check"
              checked={isComplete}
              onChange={() => {}}
              style={{ display: "none" }}
            />
            {title}
          </h5>

          <p className="card-text">{description}</p>
          <div className="row">
            <span className={`priority ${priority}`}>
              <i className="bi bi-flag-fill  pe-1"></i>
              {priority}
            </span>
          </div>
          <div className="row">
            <span className="col time">
              {startTime} - {endTime}
            </span>
            <span className="col menu-box text-end">
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
                    <button className="dropdown-item " onClick={setShowEdit}>
                      <h6>Delete</h6>
                      <i className="bi bi-trash3"></i>
                    </button>
                  </li>
                </ul>
              </div>
            </span>
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
          <Modal.Title>Edit Task</Modal.Title>
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
                  type="date"
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
              <legend className="col-form-label col-sm-2 pt-0">Priority</legend>
              <div className="col-sm-10">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="priority"
                    value={editTask.priority}
                    checked={editTask.priority === "necessary"}
                    onChange={(e) =>
                      setEditTask({
                        ...editTask,
                        [e.target.name]: e.target.value,
                      })
                    }
                  />
                  <label className="form-check-label" htmlFor="gridRadios1">
                    Necessary
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="gridRadios"
                    id="gridRadios2"
                    value="important"
                    checked={editTask.priority === "important"}
                  />
                  <label className="form-check-label" htmlFor="gridRadios2">
                    Important
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="gridRadios"
                    id="gridRadios3"
                    value="normal"
                    checked={editTask.priority === "normal"}
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
          <Button onClick={handleEditClose} className="btn btn-secondary">
            Close
          </Button>
          <Button
            onClick={handleEditClick}
            type="button"
            className="btn btn-primary"
          >
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
            Delete Task
          </h1>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete ?</Modal.Body>
        <Modal.Footer>
          <button type="button" className="btn btn-secondary">
            Back
          </button>
          <button
            type="button"
            onClick={handleDeleteClick}
            className="btn btn-primary"
          >
            Delete
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default Task;
