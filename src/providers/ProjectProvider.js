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
  const { get, post, del } = useApi();
  const { auth } = require("../firebase/index");
  const { showToast } = require("./ToastProvider");
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

  const removeCollection = async (collectionId) => {
    await del(`/projects/${id}/collections/${collectionId}`);
    const collections = project.collections.filter(
      (collection) => collection.id !== collectionId
    );
    setProject({ ...project, collections });
  };

  const removeEndpoint = async (collectionId, endpointId) => {
    await del(
      `/projects/${id}/collections/${collectionId}/endpoints/${endpointId}`
    );
    const collections = project.collections.map((c) => {
      if (c.id === collectionId) {
        return {
          ...c,
          endpoints: c.endpoints.filter((e) => e.id !== endpointId),
        };
      }
      return c;
    });
    setProject({ ...project, collections });
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

  const addBundleOfEndpoints = async (collectionId, endpoints) => {
    const e = await post(
      `/projects/${id}/collections/${collectionId}/bundle-endpoints`,
      endpoints
    );
    const collections = project.collections.map((c) => {
      if (c.id === collectionId) {
        return { ...c, endpoints: [...c.endpoints, ...e.endpoints] };
      }
      return c;
    });
    setProject({ ...project, collections });
    setEndpointCreated(true);
  };

  const linkRepository = async (repositoryName) => {
    const data = await post(`/projects/${id}/repository`, { repositoryName });
    setProject({ ...project, github: data.repository });
  };

  const removeRepository = async () => {
    await del(`/projects/${id}/repository`);
    setProject({ ...project, github: { enabled: false } });
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
        addBundleOfEndpoints,
        setEndpointCreated,
        linkRepository,
        removeRepository,
        removeCollection,
        removeEndpoint,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};
