import { createContext, useContext, useState } from "react";
import { Toast } from "../components/toast/Toast";

const ToastContext = createContext();

export const useToast = () => {
  const context = useContext(ToastContext);
  return context;
};

export const ToastContextProvider = ({ children }) => {
  const [toast, showToast] = useState(null);
  return (
    <ToastContext.Provider
      value={{
        showToast,
      }}
    >
      {children}
      {toast != null && (
        <Toast
          text={toast.text}
          icon={toast.icon}
          error={toast.error}
          close={() => showToast(null)}
        />
      )}
    </ToastContext.Provider>
  );
};
