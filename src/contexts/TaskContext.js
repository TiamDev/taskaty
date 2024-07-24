import { useReducer, createContext, useContext } from "react";
import taskReducer from "./../reducers/taskReducer";
export const TaskContext = createContext([]);
export const DispatchContext = createContext(null);

const TaskProvider = ({ children }) => {
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
export const useTaskDispatch = () => {
  return useContext(DispatchContext);
};
