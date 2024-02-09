import React, { useEffect, useState } from "react";
import { useApi } from "../client/api";
import { useProjectContext } from "../providers/ProjectProvider";

export const useGithub = () => {
  const { get, post, del } = useApi();
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [pushedToRepo, setPushedToRepo] = useState(false);
  const { project } = useProjectContext();
  const { auth } = require("../firebase/index");

  useEffect(() => {
    if (!auth.currentUser) return;
    getGithubProfile();
  }, [auth.currentUser]);

  const getGithubProfile = async () => {
    const data = await get(`/github/profile`);
    if (data) setUserProfile(data.profile);
  };

  const addGithubProfile = async (profile) => {
    const data = await post(`/github/profile`, profile);
    console.log(data);
    if (data) setUserProfile(data.profile);
  };

  const deleteGithubProfile = async () => {
    const data = await del(`/github/profile`);
    return data;
  };

  const getUserRepos = async () => {
    const data = await get(`/github/repos`);
    if (data) setUserProfile(data.profile);
  };

  const cloneRepository = async (projectId) => {
    setLoading(true);
    console.log(projectId);
    const data = await post(`/writer/write-backend`, {
      projectId,
    });
    setLoading(false);
    setPushedToRepo(true);

    return data;
  };

  return {
    getGithubProfile,
    addGithubProfile,
    deleteGithubProfile,
    getUserRepos,
    userProfile,
    cloneRepository,
    loading,
    pushedToRepo,
    setPushedToRepo,
  };
};
