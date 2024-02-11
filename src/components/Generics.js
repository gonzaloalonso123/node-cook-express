import { useEffect, useRef } from "react";
import { ColorIcon, Icon } from "./icons/Icon";

const inputStyle =
  "focus:outline-none focus:ring-0 focus:border-gray-500 border rounded-md p-2 disabled:border-transparent";
const unstyledInputStyle =
  "disabled:border-transparent rounded-md p-2 border-2 border-gray-200";
const buttonStyle =
  "rounded-md px-2 transition-all translate-y-0.5 px-4 border-2 flex items-center justify-center gap-3";
const buttonPrimary =
  "bg-nc-orange border-nc-orange text-white font-bold hover:bg-nc-dark-orange";
const buttonSecondary =
  "bg-white text-nc-dark-orange border-nc-dark-orange hover:bg-gray-100";
const buttonCreate =
  "bg-nc-green border-nc-green text-white font-bold hover:bg-nc-dark-green";
const checkboxStyle = "border-2 border-nc-orange rounded-md p-2";
const dangerButtonPrimary =
  "bg-nc-red border-nc-red text-white font-bold hover:bg-nc-dark-red";
const dangerButtonSecondary =
  "bg-white text-nc-red border-nc-red hover:bg-gray-100";

export const Input = ({ ...props }) => {
  return <input {...props} className={`${inputStyle} ${props.className}`} />;
};

export const UnstyledInput = ({ ...props }) => {
  return (
    <input
      {...props}
      className={`${unstyledInputStyle} ${props.className}`}
      autoComplete="new-password"
    />
  );
};

export const Button = ({ big, secondary, create, ...props }) => {
  return (
    <button
      {...props}
      className={`${buttonStyle} 
      ${big ? "py-2 px-4" : ""} 
      ${secondary ? buttonSecondary : create ? buttonCreate : buttonPrimary}  
      ${props.className}`}
    />
  );
};

export const DangerButton = ({ icon, secondary, ...props }) => {
  return (
    <button
      {...props}
      className={`${buttonStyle} ${
        secondary ? dangerButtonSecondary : dangerButtonPrimary
      } ${props.className}`}
    />
  );
};

export const Checkbox = ({ ...props }) => {
  return (
    <input
      {...props}
      type="checkbox"
      className={`${checkboxStyle} ${props.className}`}
    />
  );
};

export const Modal = ({
  title,
  options,
  close,
  inverted = false,
  children,
  little,
}) => {
  const ref = useRef();
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        close();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
  return (
    <div
      ref={ref}
      className={`absolute bg-white w-48 flex top-8 left-8 flex-col border border-gray-200 ${
        little ? "p-1" : "py-2"
      } rounded-md shadow-md ${inverted ? "-translate-x-48" : ""}`}
    >
      <div className="flex w-full justify-between px-4 items-center">
        <h1 className={`${little ? "" : "text-xl"} font-bold`}>{title}</h1>
        <button onClick={close} className={`${little ? "" : "text-xl"}`}>
          x
        </button>
      </div>
      {options &&
        options.map((option, i) => (
          <button
            onClick={() => {
              option.action();
              close();
            }}
            key={i}
            className={`flex py-3 w-full rounded-md items-center gap-2 menu-link cursor-pointer ${
              little ? "px-2" : "px-5"
            }`}
          >
            <Icon fontSize={`${little ? "16px" : "24px"}`}>{option.icon}</Icon>
            <label className="pointer-events-none text-sm">
              {option.title}
            </label>
          </button>
        ))}
      {children}
    </div>
  );
};

export const WindowContainer = ({ children, className }) => {
  return (
    <div
      className={
        "flex flex-col gap-4 rounded-md border shadow-md p-4 bg-white min-h-96 " +
        className
      }
    >
      {children}
    </div>
  );
};

const Loading = () => {
  return (
    <div className="absolute w-screen h-screen flex items-center justify-center top-0 left-0">
      <div className="p-6 flex flex-col items-center justify-center bg-white gap-2 rounded-md">
        <h1 className="text-lg">Loading</h1>
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-nc-dark-orange" />
      </div>
    </div>
  );
};

export const LoadingOrChildren = ({ loading, children }) => {
  return loading ? <Loading /> : children;
};

export const Popup = ({ children, close }) => {
  const ref = useRef();
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        close();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
  return (
    <div
      ref={ref}
      className="absolute top-0 left-0 w-screen h-screen flex items-center justify-center  bg-black bg-opacity-10"
    >
      <div className="p-6 bg-white rounded-md  shadow-md" ref={ref}>
        {children}
      </div>
    </div>
  );
};
