import { createContext, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useApi } from "../client/api";
import toasts from "../content/toasts.json";
import { useToast } from "./ToastProvider";

const ProjectContext = createContext();

export default ProjectContext;

export const useProjectContext = () => {
  const context = useContext(ProjectContext);
  return context;
};

export const ProjectContextProvider = ({ children }) => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const { get, post, del, patch } = useApi();
  const { auth } = require("../firebase/index");
  const { showToast } = useToast()

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
    showToast(toasts.collection_created);
  };

  const removeCollection = async (collectionId) => {
    await del(`/projects/${id}/collections/${collectionId}`);
    const collections = project.collections.filter(
      (collection) => collection.id !== collectionId
    );
    setProject({ ...project, collections });
    showToast(toasts.collection_deleted);
  };

  const updateCollection = async (collection) => {
    await patch(`/projects/${id}/collections/${collection.id}`, collection);
    const collections = project.collections.map((c) => {
      if (c.id === collection.id) {
        return collection;
      }
      return c;
    });
    setProject({ ...project, collections });
    showToast(toasts.collection_updated);
  }

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
    showToast(toasts.endpoint_deleted);
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
    showToast(toasts.endpoint_created);
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
    showToast(toasts.endpoint_created);
  };

  const linkRepository = async (repositoryName) => {
    const data = await post(`/projects/${id}/repository`, { repositoryName });
    setProject({ ...project, github: data.repository });
    showToast(toasts.repository_linked);
  };

  const removeRepository = async () => {
    await del(`/projects/${id}/repository`);
    setProject({ ...project, github: { enabled: false } });
    showToast(toasts.repository_unlinked);
  };

  return (
    <ProjectContext.Provider
      value={{
        project,
        addCollection,
        addEndpoint,
        addBundleOfEndpoints,
        linkRepository,
        removeRepository,
        removeCollection,
        removeEndpoint,
        updateCollection
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};
