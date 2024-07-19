import React, { useContext, useState, useEffect, useMemo } from "react";
import "./taskbox.css";
import image from "./../../../assets/image/mochi-post-it-notes (1).png";
import image2 from "./../../../assets/image/mochi-exclamation-marks.png";

import TaskBoxHeader from "./TaskBoxHeader";
import Task from "./Task";
import { TaskContext } from "../../../contexts/TaskContext";
import { SelectedDateContext } from "../../../contexts/SelectedDate";
import { SearchContext } from "../../../contexts/SearchContext";
import { Button, Modal } from "react-bootstrap";

const TaskBox = ({ user }) => {
  const { selectedDate } = useContext(SelectedDateContext);
  const { search, setSearch } = useContext(SearchContext);
  const { taskData, setTaskData } = useContext(TaskContext);
  const [displayType, setDisplayType] = useState("all");
  const [modalTask, setModalTask] = useState("");

  /* modal*/

  const [showDelete, setShowDelete] = useState(false);
  const handleDeleteShow = (task) => {
    setModalTask(task);
    setShowDelete(true);
  };
  const handleDeleteClose = () => setShowDelete(false);
  const handleDeleteClick = () => {
    const updatedTasks = taskData.filter((task) => {
      return task.id !== modalTask.id;
    });
    handleDeleteClose();
    setTaskData(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const [showEdit, setShowEdit] = useState(false);
  const handleEditClose = () => setShowEdit(false);
  const handleEditShow = (task) => {
    setModalTask(task);
    setShowEdit(true);
    console.log(modalTask);
  };
  const handleEditClick = () => {
    const updatedTasks = taskData.map((task) => {
      if (task.id === modalTask.id) {
        return {
          ...task,
          title: modalTask.title,
          description: modalTask.description,
          date: modalTask.date,
          priority: modalTask.priority,
          startTime: modalTask.startTime,
          endTime: modalTask.endTime,
        };
      }
      return task;
    });
    setTaskData(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    handleEditClose();
  };
  /* ===modal===*/

  const changeDisplayType = (e) => {
    setDisplayType(e);
  };
  const completedTask = useMemo(() => {
    return taskData.filter((task) => {
      return (
        task.isComplete && task.date == selectedDate && task.user_id == user
      );
    });
  }, [taskData]);
  const uncompletedTask = useMemo(() => {
    return taskData.filter((task) => {
      return (
        !task.isComplete && task.date == selectedDate && task.user_id == user
      );
    });
  }, [taskData]);

  let taskToBeRendered = taskData;
  if (displayType === "Completed") {
    taskToBeRendered = completedTask;
  } else if (displayType === "Uncompleted") {
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
        <div
          className="col-lg-6 col-md-12 col-sm-12 col-xs-12 taskbox "
          key={task.id}
        >
          <Task
            task={task}
            showDelete={handleDeleteShow}
            showEdit={handleEditShow}
          ></Task>
        </div>
      );
    });
  return (
    <>
      <TaskBoxHeader
        user={user}
        displayType={displayType}
        setType={changeDisplayType}
      ></TaskBoxHeader>
      {taskList.length === 0 ? (
        <div className="row scroller">
          <p className="empty">There are no tasks</p>
        </div>
      ) : (
        <div className="row scroller">{taskList}</div>
      )}
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
              value={modalTask.title}
              onChange={(e) =>
                setModalTask({ ...modalTask, [e.target.name]: e.target.value })
              }
              className="form-control"
            />
          </div>
          <div className="mt-2">
            <label htmlFor="title">Description</label>
            <textarea
              className="form-control"
              value={modalTask.description}
              name="description"
              onChange={(e) =>
                setModalTask({ ...modalTask, [e.target.name]: e.target.value })
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
                  value={modalTask.date}
                  onChange={(e) =>
                    setModalTask({
                      ...modalTask,
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
                  value={modalTask.startTime}
                  onChange={(e) =>
                    setModalTask({
                      ...modalTask,
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
                  value={modalTask.endTime}
                  onChange={(e) =>
                    setModalTask({
                      ...modalTask,
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
                      modalTask.priority === "necessary"
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
                        checked={modalTask.priority === "necessary"}
                        onChange={(e) =>
                          setModalTask({
                            ...modalTask,
                            [e.target.name]: e.target.value,
                          })
                        }
                      />
                      Necessary
                    </label>
                  </div>
                  <div
                    className={`form-check ${
                      modalTask.priority === "important"
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
                        checked={modalTask.priority === "important"}
                        onChange={(e) =>
                          setModalTask({
                            ...modalTask,
                            [e.target.name]: e.target.value,
                          })
                        }
                      />
                      Important
                    </label>
                  </div>
                  <div
                    className={`form-check ${
                      modalTask.priority === "normal" ? "border__success" : ""
                    }`}
                  >
                    <label htmlFor="normal">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="priority"
                        id="normal"
                        value="normal"
                        checked={modalTask.priority === "normal"}
                        onChange={(e) =>
                          setModalTask({
                            ...modalTask,
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
    </>
  );
};
export default TaskBox;
