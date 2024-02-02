import { useEffect, useRef, useState } from "react";
import { Icon } from "../icons/Icon";

export const Select = ({ options, onChange, color }) => {
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

  return (
    <div
      className={`flex flex-col relative rounded-md bg-white ${
        !expanded ? `border-black` : "border-transparent"
      } `}
      ref={ref}
    >
      <div
        className="cursor-pointer w-48 p-2 text-nc-black flex items-center justify-between"
        onClick={() => setExpanded(!expanded)}
      >
        {s.label}
        <Icon fontSize="24px">arrow_drop_down</Icon>
      </div>
      {expanded && (
        <div className="absolute top-0 left-0 w-48 bg-white p-2 rounded-md border border-black z-10">
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
