import React, { useEffect, useState } from "react";
import { useApi } from "../client/api";
import { useToast } from "../providers/ToastProvider";
import toasts from "../content/toasts.json";

export const useGithub = () => {
  const { get, post, del } = useApi();
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();
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

  const cloneRepository = async (projectId, codeSettings) => {
    setLoading(true);
    console.log(projectId);
    const data = await post(`/writer/write-backend`, {
      projectId,
      options: codeSettings,
    });
    setLoading(false);
    showToast(toasts.pushed_to_repository);
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
  };
};
