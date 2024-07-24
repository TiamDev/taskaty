import { useReducer, createContext, useContext } from "react";
import taskReducer from "./../reducers/taskReducer";
export const TaskContext = createContext([]);
export const DispatchContext = createContext(null);

const TaskProvider = ({ children }) => {
  // const tasks = JSON.parse(.getItem("tasks"));

  const [taskData, tasksDispatch] = useReducer(taskReducer, []);
  return (
    <TaskContext.Provider value={taskData}>
      <DispatchContext.Provider value={tasksDispatch}>
        {children}
      </DispatchContext.Provider>
    </TaskContext.Provider>
  );
};
export default TaskProvider;
export const useTasks = () => {
  return useContext(TaskContext);
};
export const useDispatch = () => {
  return useContext(DispatchContext);
};
