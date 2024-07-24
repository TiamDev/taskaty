import "./taskbox.css";
import { useTaskDispatch, useTasks } from "../../../contexts/TaskContext";
import { useToast } from "../../../contexts/ToastContext";

const Task = ({ task, showDelete, showEdit }) => {
  const taskData = useTasks();
  const dispatch = useTaskDispatch();
  const { showHideToast } = useToast();
  const handleCheckClick = () => {
    dispatch({ type: "toggledCompleted", payload: task });
    const handelMessage = task.isComplete
      ? "Modify Task to incompleted 😓"
      : "Task Completed 😀";
    showHideToast(handelMessage);
  };

  const handleDeleteClick = () => {
    showDelete(task);
  };
  const handleEditClick = () => {
    showEdit(task);
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
                <button className="dropdown-item " onClick={handleEditClick}>
                  <h6>Edit</h6>
                  <i className="bi bi-vector-pen"></i>
                </button>
              </li>
              <li>
                <button className="dropdown-item " onClick={handleDeleteClick}>
                  <h6>Delete</h6>
                  <i className="bi bi-trash3"></i>
                </button>
              </li>
            </ul>
          </div>
        </span>
        <div
          className={`card-body clickable-card  ${
            task.isComplete ? "checked" : ""
          }`}
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
              checked={task.isComplete}
              onChange={() => {}}
              style={{ display: "none" }}
            />
            {task.title}
          </h5>
          <div className=" ps-4">
            {" "}
            <h6 className="card-text">{task.description}</h6>
            <div className="row">
              <span className={`priority ${task.priority}`}>
                <i className="bi bi-flag-fill  pe-1"></i>
                {task.priority}
              </span>
            </div>
            <div className="row">
              <span className="col time">
                {convertTo12HourFormat(task.startTime)} -{" "}
                {convertTo12HourFormat(task.endTime)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Task;
