import React, { useEffect } from "react";
import { Icon } from "../icons/Icon";
import './Toast.css'

export const Toast = ({ icon, text, close }) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      close();
    }, 2000);
    return () => {
      clearTimeout(timeout);
    };
  }, [close]);
  return (
    <div className="bg-nc-green text-white p-2 rounded-md pointer-events-auto flex right-12 bottom-12 items-center absolute toast transition-all duration-75 shadow-sm">
      <div className="p-4">
        <Icon fontSize="24px" color="white">
          {icon}
        </Icon>
      </div>
      <h1>{text}</h1>
    </div>
  );
};
