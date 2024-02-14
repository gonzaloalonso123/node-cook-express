import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import {
  AuthenticationProvider,
  useAuthentication,
} from "./providers/AuthenticationProvider";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Page } from "./page/Page";
import { NewProject } from "./pages/NewProject";
import { Project } from "./pages/Project";
import { ProjectGeneral } from "./pages/ProjectGeneral";
import { ProjectCollections } from "./pages/ProjectCollections";
import { ProjectEndpoints } from "./pages/ProjectEndpoints";
import { ProjectCode } from "./pages/ProjectCode";
import { ProjectApiDoc } from "./pages/ProjectApiDoc";
import { ProjectDeployment } from "./pages/ProjectDeployment";
import { ProjectDatabase } from "./pages/ProjectDatabase";
import { ProjectUsage } from "./pages/ProjectUsage";
import { ProjectContextProvider } from "./providers/ProjectProvider";
import { Settings } from "./pages/Settings";
import { SettingsProvider } from "./providers/SettingsProvider";
import { GithubSettings } from "./pages/GithubSettings";
import { ToastContextProvider } from "./providers/ToastProvider";
import { useEffect } from "react";

const RouteMap = () => {
  const { user } = useAuthentication();
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else {
      navigate("/");
    }
  }, [user]);
  return (
    <Routes>
      {!user && <Route index path="/login" element={<Login />} />}
      {user && <Route path="*" element={<PageWrapper />} />}
    </Routes>
  );
};

const PageWrapper = () => (
  <SettingsProvider>
    <Page>
      <Routes>
        <Route index path="/" element={<Home />} />
        <Route path="new-project" element={<NewProject />} />
        <Route path="project/:id/*" element={<ProjectWrapper />} />
        <Route path="settings/*" element={<SettingsWrapper />} />
      </Routes>
    </Page>
  </SettingsProvider>
);

const ProjectWrapper = () => (
  <ProjectContextProvider>
    <Project>
      <Routes>
        <Route index element={<ProjectGeneral />} />
        <Route path="general" element={<ProjectGeneral />} />
        <Route path="collections" element={<ProjectCollections />} />
        <Route path="endpoints" element={<ProjectEndpoints />} />
        <Route path="code" element={<ProjectCode />} />
        <Route path="api-doc" element={<ProjectApiDoc />} />
        <Route path="deployment" element={<ProjectDeployment />} />
        <Route path="database" element={<ProjectDatabase />} />
        <Route path="usage" element={<ProjectUsage />} />
      </Routes>
    </Project>
  </ProjectContextProvider>
);

const SettingsWrapper = () => (
  <Settings>
    <Routes>
      <Route index element={<Settings />} />
      <Route path="github-settings" element={<GithubSettings />} />
    </Routes>
  </Settings>
);

function App() {
  return (
    <BrowserRouter>
      <AuthenticationProvider>
        <ToastContextProvider>
          <RouteMap />
        </ToastContextProvider>
      </AuthenticationProvider>
    </BrowserRouter>
  );
}

export default App;
