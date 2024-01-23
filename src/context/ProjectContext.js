import { createContext, useContext, useEffect, useState } from "react";
import { getProjectById } from "../client/projects";
import { useParams } from "react-router-dom";

const ProjectContext = createContext();

export default ProjectContext;

export const useProjectContext = () => {
  const project = useContext(ProjectContext);
  return project;
};

export const ProjectContextProvider = ({ children }) => {
  const { id } = useParams();
  const [project, setProject] = useState(null);

  useEffect(() => {
    getProjectById(id).then((project) => setProject(project));
  }, [id]);

  return (
    <ProjectContext.Provider value={{ project }}>
      {children}
    </ProjectContext.Provider>
  );
};
