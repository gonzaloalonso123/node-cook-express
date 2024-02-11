import { useEffect, useRef, useState } from "react";
import { Icon } from "../icons/Icon";

export const Select = ({ options, onChange, color, value, disabled, fit }) => {
  const [s, setS] = useState(options[0]);
  const [expanded, setExpanded] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setExpanded(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);

  useEffect(() => {
    if (value === undefined) return;
    setS(options.find((o) => o.value === value));
  }, [value, options]);

  return (
    <div
      className={`flex flex-col relative flex-1 ${
        disabled ? "bg-gray-100" : "bg-white"
      } rounded-md  ${!expanded ? `border-nc-yellow` : "border-transparent"} `}
      ref={ref}
    >
      <div
        className={`cursor-pointer w-full ${
          fit ? "" : "min-w-48"
        } p-2 text-nc-black flex items-center justify-between`}
        onClick={() => setExpanded(disabled ? false : !expanded)}
      >
        {s.label}
        <Icon fontSize="24px">arrow_drop_down</Icon>
      </div>
      {expanded && (
        <div className="absolute top-0 left-0 w-full bg-white p-2 rounded-md shadow-md border border-gray-500 z-10 max-h-48 overflow-scroll">
          <ul>
            <li
              key={s.value}
              className="p-2 font-bold hover:bg-nc-light-orange cursor-pointer hover:bg-gray-100 select-none rounded-md"
              onClick={() => {
                setExpanded(false);
              }}
            >
              {s.label}
            </li>
            {options
              .filter((o) => o.value !== s.value)
              .map((option) => (
                <li
                  key={option.value}
                  className="p-2 hover:bg-nc-light-orange cursor-pointer hover:bg-gray-100 select-none rounded-md"
                  onClick={() => {
                    setS(option);
                    onChange(option.value);
                    setExpanded(false);
                  }}
                >
                  {option.label}
                </li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
};
