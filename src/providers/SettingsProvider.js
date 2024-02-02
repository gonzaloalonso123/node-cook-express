import { createContext, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useApi } from "../client/api";

const ProjectContext = createContext();

export default ProjectContext;

export const useSettings = () => {
  const context = useContext(ProjectContext);
  return context;
};

export const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState(null);
  const { get } = useApi();
  const { auth } = require("../firebase/index");

  useEffect(() => {
    if (!auth.currentUser) return;
    const getSettings = async () => {
      //   const data = await get(`/settings`);
      //   setSettings(data.settings);
      setSettings({
        name: "My Project",
        logo: "https://cdn.example.com/logo.png",
        favicon: "https://cdn.example.com/favicon.png",
        theme: "light",
        customCss: "body { background-color: #f0f0f0; }",
        githubSettings: {
          username: "username",
          access_token: "access_token",
        },
      });
    };

    getSettings();
  }, []);
  return (
    <ProjectContext.Provider
      value={{
        settings,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};
