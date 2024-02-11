import { createContext, useContext, useEffect, useState } from "react";
import { Toast } from "../components/toast/Toast";

const ToastContext = createContext();

export const useToast = () => {
  const context = useContext(ToastContext);
  return context;
};

export const ToastContextProvider = ({ children }) => {
  const [toast, showToast] = useState(null);
  useEffect(() => {
    console.log(toast);
  }, [toast]);
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
