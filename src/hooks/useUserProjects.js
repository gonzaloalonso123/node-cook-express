import { useContext, useEffect, useState } from "react";
import { getUserProjects } from "../client/projects";
import { AuthenticationContext } from "../providers/AuthenticationProvider";

export const useUserProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthenticationContext);

  useEffect(() => {
    const getProjects = async () => {
      const projects = await getUserProjects();
      setProjects(projects);
      setLoading(false);
    };

    getProjects();
  }, []);

  return { projects, loading };
};
