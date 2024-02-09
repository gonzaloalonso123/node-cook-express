import React, { useEffect } from "react";
import { BoldIcon, Icon } from "../icons/Icon";
import "./Toast.css";

export const Toast = ({ icon, text, close, error }) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      close();
    }, 2000);
    return () => {
      clearTimeout(timeout);
    };
  }, [close]);
  return (
    <div
      className={`${
        error ? "bg-nc-red" : "bg-nc-green"
      } text-white p-2 rounded-md pointer-events-auto flex right-12 bottom-12 items-center absolute toast transition-all duration-75 shadow-xl`}
    >
      <div className="p-4">
        <BoldIcon fontSize="24px" color="white">
          {icon}
        </BoldIcon>
      </div>
      <h1 className="px-4">{text}</h1>
    </div>
  );
};
