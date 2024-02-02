import axios from "axios";
import { useEffect, useState } from "react";
import { useAuthentication } from "../providers/AuthenticationProvider";
import { auth } from "../firebase/index";

const api = axios.create({
  baseURL: "http://localhost:1998/",
});

export const useApi = () => {
  const [error, setError] = useState(null);

  const setAuthorizationHeader = async () => {
    try {
      const idToken = await auth.currentUser.getIdToken(true);
      api.defaults.headers.common["Authorization"] = idToken;
    } catch (error) {
      setError(error.message);
    }
  };

  const get = async (url) => {
    await setAuthorizationHeader();
    try {
      const { data } = await api.get(url);
      return data;
    } catch (error) {
      setError(error.message);
    }
  };

  const post = async (url, body) => {
    await setAuthorizationHeader();
    try {
      const { data } = await api.post(url, body);
      return data;
    } catch (error) {
      setError(error.message);
    }
  };

  const put = async (url, body) => {
    await setAuthorizationHeader();
    try {
      const { data } = await api.put(url, body);
      return data;
    } catch (error) {
      setError(error.message);
    }
  };

  const del = async (url) => {
    await setAuthorizationHeader();
    try {
      const { data } = await api.delete(url);
      return data;
    } catch (error) {
      setError(error.message);
    }
  };

  return { error, get, post, put, del };
};
