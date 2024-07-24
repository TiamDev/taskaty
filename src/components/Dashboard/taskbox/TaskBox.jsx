import React, { useContext, useState, useMemo, useEffect } from "react";
import "./taskbox.css";
import image from "./../../../assets/image/mochi-post-it-notes (1).png";
import image2 from "./../../../assets/image/mochi-exclamation-marks.png";
import Task from "./Task";
import { CalenderSelectedDateContext } from "../../../contexts/CalenderSelectedDateContext";
import { Button, Modal } from "react-bootstrap";
import { useToast } from "../../../contexts/ToastContext";
import { useTasks } from "../../../contexts/TaskContext";
import { useTaskDispatch } from "../../../contexts/TaskContext";

const TaskBox = ({ user }) => {
  const { calenderSelectedDate } = useContext(CalenderSelectedDateContext);
  const { showHideToast } = useToast();
  const [displayType, setDisplayType] = useState("all");
  const [search, setSearch] = useState("");
  const [modalTask, setModalTask] = useState("");
  const [showAdd, setShowAdd] = useState(false);
  const taskData = useTasks();
  const dispatch = useTaskDispatch();

  useEffect(() => {
    dispatch({ type: "get" });
  }, []);

  /* modal*/
  // ----------ADD-----------
  const [addTask, setAddTask] = useState({
    title: "",
    description: "",
    startTime: "",
    endTime: "",
    date: new Date().toLocaleDateString(),
    priority: "necessary",
  });
  const handleAddClose = () => setShowAdd(false);
  const handleAddShow = () => setShowAdd(true);
  const handleAddTask = () => {
    dispatch({
      type: "add",
      payload: {
        user_id: user,
        isComplete: false,
        title: addTask.title,
        description:
          addTask.description == "" ? "no description" : addTask.description,
        startTime: addTask.startTime,
        endTime: addTask.endTime,
        date: new Date(addTask.date).toLocaleDateString(),
        priority: addTask.priority,
      },
    });
    handleAddClose();
    setAddTask({
      title: "",
      description: "",
      startTime: "",
      endTime: "",
      date: new Date().toLocaleDateString(),
      priority: "necessary",
    });
    showHideToast("Task Added Successfully");
  };
  const btnDisabled =
    addTask.title === "" ||
    addTask.startTime === "" ||
    addTask.endTime === "" ||
    addTask.priority === "";
  // ====ADD====//

  // ----------DELETE-----------
  const [showDelete, setShowDelete] = useState(false);
  const handleDeleteShow = (task) => {
    setModalTask(task);
    setShowDelete(true);
  };
  const handleDeleteClose = () => setShowDelete(false);
  const handleDeleteClick = () => {
    dispatch({ type: "delete", payload: modalTask.id });
    handleDeleteClose();
    showHideToast("Task Deleted Successfully");
  };
  // ====DELETE====//
  // ----------EDIT-----------
  const [showEdit, setShowEdit] = useState(false);
  const handleEditClose = () => setShowEdit(false);
  const handleEditShow = (task) => {
    setModalTask(task);
    setShowEdit(true);
  };
  const handleEditClick = () => {
    dispatch({
      type: "edit",
      payload: modalTask,
    });
    handleEditClose();
    showHideToast("Task Updated Successfully");
  };
  // ====EDIT====//

  /* ===modal===*/

  const changeDisplayType = (e) => {
    setDisplayType(e);
  };
  const completedTask = useMemo(() => {
    return taskData.filter((task) => {
      return (
        task.isComplete &&
        task.date == calenderSelectedDate &&
        task.user_id == user
      );
    });
  }, [taskData]);
  const uncompletedTask = useMemo(() => {
    return taskData.filter((task) => {
      return (
        !task.isComplete &&
        task.date == calenderSelectedDate &&
        task.user_id == user
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
      return task && task.date == calenderSelectedDate && task.user_id == user;
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
      <div className="taskbox__header">
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
          <div className="col-4 d-flex">
            <div className="dropdown pe-3">
              <button
                className="dropdown-toggle type-btn"
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
                      changeDisplayType(e.target.value);
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
                      changeDisplayType(e.target.value);
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
                      changeDisplayType(e.target.value);
                    }}
                  >
                    Uncompleted
                  </Button>
                </li>
              </ul>
            </div>
          </div>

          <div className="col-3 text-end ">
            <Button
              className={"btn btn-primary btn-add"}
              onClick={handleAddShow}
            >
              <i className="bi bi-plus-square-fill "></i> <span>New Task</span>
            </Button>
          </div>
        </div>
      </div>
      {taskList.length === 0 ? (
        <div className="row scroller">
          <p className="empty">There are no tasks</p>
        </div>
      ) : (
        <div className="row scroller">{taskList}</div>
      )}

      {/*  Add Modal  */}
      <Modal show={showAdd} onHide={handleAddClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            <img src={image} width={"35rem"} className="me-3" alt="" />
            New Task
          </Modal.Title>
        </Modal.Header>
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
                      addTask.priority === "necessary" ? "border__success" : ""
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
                      addTask.priority === "important" ? "border__success" : ""
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
        <Modal.Footer>
          <Button
            onClick={handleAddTask}
            disabled={btnDisabled}
            className="btn btn-primary"
          >
            Create New Task
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
