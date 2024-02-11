import { createContext, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useApi } from "../client/api";
import { useToast } from "./ToastProvider";
import toasts from "../content/toasts.json";

const ProjectContext = createContext();

export default ProjectContext;

export const useSettings = () => {
  const context = useContext(ProjectContext);
  return context;
};

export const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState(null);
  const { get, put } = useApi();
  const { auth } = require("../firebase/index");
  const { showToast } = useToast();

  useEffect(() => {
    if (!auth.currentUser) return;
    const getSettings = async () => {
      const data = await get(`/settings`);
      setSettings(data.settings);
    };

    getSettings();
  }, [auth.currentUser]);

  const updateSettings = async (key, data) => {
    const newSettings = { ...settings, [key]: data };
    setSettings(newSettings);
    showToast({ text: `Updated settings: ${key}`, icon: "done" });
    await putSettings(newSettings);
  };

  const putSettings = async (data) => {
    const newData = await put(`/settings`, data);
    console.log(newData);
    // setSettings(newData.settings);
  };

  return (
    <ProjectContext.Provider
      value={{
        settings,
        updateSettings,
        setSettings,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};
