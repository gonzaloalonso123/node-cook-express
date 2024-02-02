import React, { useEffect, useState } from "react";
import { Icon } from "./icons/Icon";
import { Link } from "react-router-dom";

export const HeaderMenu = ({ items }) => (
  <div className="flex gap-6">
    {items.map((item, i) => {
      return <ProjectMenuItem item={item} key={i} />;
    })}
  </div>
);

const ProjectMenuItem = ({ item }) => {
  const [isActive, setIsActive] = useState(false);
  useEffect(() => {
    setIsActive(window.location.pathname.includes(item.path));
  }, [window.location.pathname]);
  return (
    <Link
      className={`flex gap-2 cursor-pointer project-menu-link p-2 rounded-md ${
        isActive ? "active" : ""
      }`}
      disabled={item.disabled}
      to={item.path}
    >
      <Icon color="FFBB64">{item.icon}</Icon>
      <h1 className="font-regular">{item.name}</h1>
    </Link>
  );
};
