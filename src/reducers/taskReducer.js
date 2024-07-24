import { v4 as uuidv4 } from "uuid";

export default function reducer(currentTask, action) {
  switch (action.type) {
    case "add": {
      const newTask = {
        id: uuidv4(),
        user_id: action.payload.user_id,
        isComplete: false,
        title: action.payload.title,
        description:
          action.payload.description == ""
            ? "no description"
            : action.payload.description,
        startTime: action.payload.startTime,
        endTime: action.payload.endTime,
        date: new Date(action.payload.date).toLocaleDateString(),
        priority: action.payload.priority,
      };
      const updatedTasks = [...currentTask, newTask];
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      return updatedTasks;
    }
    case "edit": {
      const updatedTasks = currentTask.map((task) => {
        if (task.id === action.payload.id) {
          return {
            ...task,
            title: action.payload.title,
            description: action.payload.description,
            date: action.payload.date,
            priority: action.payload.priority,
            startTime: action.payload.startTime,
            endTime: action.payload.endTime,
          };
        }
        return task;
      });
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));

      return updatedTasks;
    }
    case "delete": {
      const updatedTasks = currentTask.filter((task) => {
        return task.id !== action.payload;
      });
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      return updatedTasks;
    }
    case "get": {
      const storageTasks = localStorage.getItem("tasks");
      if (storageTasks) {
        try {
          const Tasks = JSON.parse(storageTasks);
          return Tasks;
        } catch (error) {
          console.error("Error parsing localStorage data:", error);
          return [];
        }
      } else {
        return [];
      }
    }
    case "toggledCompleted": {
      const updatedTasks = currentTask.map((t) => {
        if (t.id == action.payload.id) {
          const updateTask = { ...t, isComplete: !t.isComplete };
          return updateTask;
        }
        return t;
      });
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      return updatedTasks;
    }
    default: {
      throw Error("unknown Action " + action.type);
    }
  }
}
