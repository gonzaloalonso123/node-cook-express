import React from "react";
import { Header } from "../components/Header";
import { Link } from "react-router-dom";
import { Icon } from "../components/icons/Icon";
import "./Page.css";

export const Page = ({ children }) => {
  return (
    <div className="w-screen flex">
      <Header />
      <SideNav />
      <div className="w-full flex justify-end pt-12">{children}</div>
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
  return (
    <div className="w-1/6 h-screen bg-white fixed top-12 shadow-md flex flex-col z-10 border-t border-2">
      {menu.map((item) => (
        <NavItem item={item} />
      ))}
    </div>
  );
};

const NavItem = ({ item }) => (
  <Link
    className="pl-8 py-4 font-regular text-gray-800 menu-link flex gap-5"
    to={item.path}
  >
    <Icon color="black">{item.icon}</Icon>
    {item.name}
  </Link>
);
