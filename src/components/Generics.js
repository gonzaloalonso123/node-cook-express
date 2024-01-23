import { ColorIcon, Icon } from "./icons/Icon";

const inputStyle = "border-2 border-nc-orange rounded-md p-2";
const buttonStyle =
  "rounded-md px-2 hover:bg-nc-orange transition-all translate-y-0.5 px-4 border-2";
const checkboxStyle = "border-2 border-nc-orange rounded-md p-2";

export const Input = ({ ...props }) => {
  return <input {...props} className={`${inputStyle} ${props.className}`} />;
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
        options.map((option) => (
          <button
            onClick={option.action}
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
