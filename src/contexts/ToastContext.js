import { createContext, useContext, useState } from "react";
import ToastBar from "../components/Dashboard/taskbox/ToastBar";

export const ToastContext = createContext([]);
//component
export const ToastProvider = ({ children }) => {
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState("");
  function showHideToast(message) {
    setShow(true);
    setMessage(message);
    setTimeout(() => {
      setShow(false);
    }, 3000);
  }
  return (
    <ToastContext.Provider value={{ showHideToast }}>
      <ToastBar show={show} message={message}></ToastBar>
      {children}
    </ToastContext.Provider>
  );
};
export const useToast = () => {
  return useContext(ToastContext);
};
