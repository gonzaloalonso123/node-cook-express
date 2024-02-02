import { createContext, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useApi } from "../client/api";

const ProjectContext = createContext();

export default ProjectContext;

export const useProjectContext = () => {
  const context = useContext(ProjectContext);
  return context;
};

export const ProjectContextProvider = ({ children }) => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const { get, post } = useApi();
  const { auth } = require("../firebase/index");
  const [endpointCreated, setEndpointCreated] = useState(false);
  const [collectionCreated, setCollectionCreated] = useState(false);

  useEffect(() => {
    if (!auth.currentUser) return;
    const getProject = async () => {
      const data = await get(`/projects/${id}`);
      setProject(data.project);
    };

    getProject();
  }, [id, auth.currentUser]);

  const addCollection = async (collection) => {
    const c = await post(`/projects/${id}/collections`, collection);

    setProject({
      ...project,
      collections: [...project.collections, c.collection],
    });
    setCollectionCreated(true);
  };

  const addEndpoint = async (collectionId, endpoint) => {
    const e = await post(
      `/projects/${id}/collections/${collectionId}/endpoints`,
      endpoint
    );
    const collections = project.collections.map((c) => {
      if (c.id === collectionId) {
        return { ...c, endpoints: [...c.endpoints, e.endpoint] };
      }
      return c;
    });
    setProject({ ...project, collections });
    setEndpointCreated(true);
  };

  return (
    <ProjectContext.Provider
      value={{
        project,
        addCollection,
        addEndpoint,
        endpointCreated,
        setCollectionCreated,
        collectionCreated,
        setEndpointCreated,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};
