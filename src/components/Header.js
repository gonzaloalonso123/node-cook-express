import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Modal } from "./Generics";
import { AuthenticationContext } from "../providers/AuthenticationProvider";
import { ColorIcon, Icon } from "./icons/Icon";
import Logo from "../assets/images/logo.png";

export const Header = () => {
  const navigate = useNavigate();
  const path = window.location.pathname;
  const { user } = useContext(AuthenticationContext);

  return (
    <div className="w-full shadow-md flex justify-between px-6 py-2 items-center bg-gray-100 z-50">
      <div className="flex gap-2 items-end">
        <img src={Logo} className="w-8 h-8" />
        <h1 className="font-black text-xl ">Node cook</h1>
      </div>
      {path !== "/login" && !user && (
        <Button onClick={() => navigate("/login")}>Identify</Button>
      )}
      {user && <UserDropDown user={user} />}
    </div>
  );
};

const UserDropDown = ({ user }) => {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const { logout } = useContext(AuthenticationContext);
  return (
    <div>
      <div
        className="flex gap-2 items-center px-4 rounded-md cursor-pointer border-2 bg-white"
        onClick={() => setSettingsOpen(!settingsOpen)}
      >
        <label className="text-sm pointer-events-none">{user.email}</label>
        <Icon color="FFBB64">settings</Icon>
      </div>
      {settingsOpen && (
        <Modal
          title="Settings"
          close={() => setSettingsOpen(false)}
          options={[
            {
              title: "Configuration",
              icon: "settings",
              action: () => console.log("general"),
            },
            {
              title: "Account",
              icon: "person",
              action: () => console.log("account"),
            },
            {
              title: "Upload",
              icon: "upload",
              action: () => console.log("upload"),
            },
            {
              title: "Help",
              icon: "help",
              action: () => console.log("help"),
            },
            {
              title: "Logout",
              icon: "logout",
              action: logout,
            },
          ]}
        />
      )}
    </div>
  );
};
