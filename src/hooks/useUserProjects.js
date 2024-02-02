import { useEffect, useState } from "react";
import { useApi } from "../client/api";
import { useAuthentication } from "../providers/AuthenticationProvider";

export const useUserProjects = () => {
  const [projects, setProjects] = useState(null);
  const { get, loading } = useApi();
  const { auth } = require("../firebase/index");

  useEffect(() => {
    if (!auth.currentUser) return;
    getProjects();
  }, [auth.currentUser]);

  const getProjects = async () => {
    get("/projects").then((data) => {
      setProjects(data.projects);
    });
  };

  return { projects, loading, setProjects };
};
