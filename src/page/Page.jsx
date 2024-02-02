import React, { useContext, useRef, useState } from "react";
import { Header } from "../components/Header";
import { Link } from "react-router-dom";
import { Icon } from "../components/icons/Icon";
import "./Page.css";
import { ScrollProvider } from "../hooks/scrollContext";

export const Page = ({ children }) => {
  const ref = useRef(null);
  return (
    <div className="flex w-screen h-screen">
      <SideNav />
      <div className="w-full h-full flex flex-col">
        <Header />
        <ScrollProvider targetRef={ref}>
          <div className="overflow-auto" ref={ref}>
            {children}
          </div>
        </ScrollProvider>
      </div>
    </div>
  );
};

const menu = [
  {
    name: "Projects",
    path: "/",
    icon: "network_node",
  },
  {
    name: "New project",
    path: "/new-project",
    icon: "add",
  },
];

const SideNav = () => {
  const [expanded, setExpanded] = useState(true);
  return (
    <div
      className={`${
        expanded ? "w-[15%]" : "w-[5%]"
      } bg-white shadow-md flex flex-col z-10 border-t border-2 border-gray-200 transition-width duration-100`}
    >
      <ExpandController
        expanded={expanded}
        toggleExpanded={() => setExpanded(!expanded)}
      />
      {menu.map((item, i) => (
        <NavItem item={item} expanded={expanded} key={i} />
      ))}
    </div>
  );
};

const ExpandController = ({ expanded, toggleExpanded }) => (
  <div
    className="flex items-center justify-end text-black font-bold cursor-pointer select-none"
    onClick={toggleExpanded}
  >
    <Icon
      className={`${
        expanded ? "transform rotate-180" : ""
      } transition-transform duration-300`}
    >
      keyboard_arrow_right
    </Icon>
  </div>
);

const NavItem = ({ item, expanded }) => (
  <Link
    className={`p-2 font-regular text-gray-800 menu-link flex gap-3 ${
      !expanded ? "justify-center" : ""
    } duration-100`}
    to={item.path}
  >
    <Icon color="black">{item.icon}</Icon>
    {expanded && item.name}
  </Link>
);
