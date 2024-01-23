import React, { useContext } from "react";
import { Header } from "../components/Header";
import { Link } from "react-router-dom";
import { Icon } from "../components/icons/Icon";
import "./Page.css";
import {
  NavBarContextProvider,
  useNavBarContext,
} from "../context/NavBarContext";

export const Page = ({ children }) => {
  return (
    <NavBarContextProvider>
      <div className="w-screen flex">
        <Header />
        <SideNav />
        <div className="w-full flex justify-end pt-12">{children}</div>
      </div>
    </NavBarContextProvider>
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
  const { expanded, toggleExpanded } = useNavBarContext();
  return (
    <div
      className={`${
        expanded ? "w-[15%]" : "w-[5%]"
      } h-screen bg-white fixed top-12 shadow-md flex flex-col z-10 border-t border-2 border-gray-200 transition-width duration-100`}
    >
      <ExpandController expanded={expanded} toggleExpanded={toggleExpanded} />
      {menu.map((item) => (
        <NavItem item={item} expanded={expanded} />
      ))}
    </div>
  );
};

const ExpandController = ({ expanded, toggleExpanded }) => (
  <div
    className="flex items-center justify-end text-black font-bold cursor-pointer"
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
    className={`p-2 font-regular text-gray-800 menu-link flex gap-5 ${
      !expanded ? "justify-center" : ""
    } duration-100`}
    to={item.path}
  >
    <Icon color="black">{item.icon}</Icon>
    {expanded && item.name}
  </Link>
);
