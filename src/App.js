import { BrowserRouter, Route, Routes } from "react-router-dom";
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

const RouteMap = () => {
  const { user } = useAuthentication();
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<PageWrapper />} />
    </Routes>
  );
};

const PageWrapper = () => (
  <Page>
    <Routes>
      <Route index element={<Home />} />
      <Route path="new-project" element={<NewProject />} />
      <Route path="project/:id/*" element={<ProjectWrapper />} />
      <Route path="settings/*" element={<SettingsWrapper />} />
    </Routes>
  </Page>
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
  <SettingsProvider>
    <Settings>
      <Routes>
        <Route index element={<Settings />} />
        <Route path="github-settings" element={<GithubSettings />} />
      </Routes>
    </Settings>
  </SettingsProvider>
);

function App() {
  return (
    <BrowserRouter>
      <AuthenticationProvider>
        <RouteMap />
      </AuthenticationProvider>
    </BrowserRouter>
  );
}

export default App;
