import { ColorIcon, Icon } from "./icons/Icon";

const inputStyle =
  "border-2 border-nc-orange rounded-md p-2 disabled:border-transparent";
const unstyledInputStyle =
  "disabled:border-transparent rounded-md p-2";
const buttonStyle =
  "rounded-md px-2 hover:bg-nc-orange transition-all translate-y-0.5 px-4 border-2 flex items-center justify-center";
const checkboxStyle = "border-2 border-nc-orange rounded-md p-2";

const selectStyle =
  "border-2 border-nc-orange rounded-md p-2 disabled:border-transparent";

export const Input = ({ ...props }) => {
  return <input {...props} className={`${inputStyle} ${props.className}`} />;
};

export const UnstyledInput = ({ ...props }) => {
  return (
    <input {...props} className={`${unstyledInputStyle} ${props.className}`} />
  );
};

export const Button = ({ big, secondary, ...props }) => {
  return (
    <button
      {...props}
      className={`${buttonStyle} 
      ${big ? "py-2 px-4" : ""} 
      ${
        secondary
          ? "bg-white text-nc-dark-orange border-nc-dark-orange hover:text-white"
          : "bg-nc-dark-orange border-transparent text-white font-bold"
      }  
      ${props.className}`}
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
}) => {
  return (
    <div
      className={`absolute bg-white w-48 flex flex-col border border-gray-200 pt-5 rounded-md shadow-md mt-5 ${
        inverted ? "-translate-x-48" : ""
      }`}
    >
      <div className="flex w-full justify-between mb-4 px-5 items-center">
        <h1 className="text-xl font-bold">{title}</h1>
        <button onClick={close} className="text-2xl font-bold">
          x
        </button>
      </div>
      {options &&
        options.map((option, i) => (
          <button
            onClick={option.action}
            key={i}
            className="flex py-3 w-full items-center gap-2 menu-link cursor-pointer px-5"
          >
            <Icon fontSize="24px">{option.icon}</Icon>
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
