import {
  browserLocalPersistence,
  createUserWithEmailAndPassword,
  setPersistence,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import React, { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

export const AuthenticationContext = createContext();

export const useAuthentication = () => {
  const context = useContext(AuthenticationContext);
  return context;
};

export const AuthenticationProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setPersistence(auth, browserLocalPersistence)
      .then(() => {
        const user = auth.currentUser;
        if (user) {
          setUser(user);
          setError(null);
          // navigate("/");
        } else {
          setError(null);
        }
      })
      .catch(() => {
        setError(null);
        navigate("/login");
      });
  }, [navigate]);

  const register = (email, password) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setUser(user);
        setError(null);
        navigate("/");
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  const login = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setUser(user);
        setError(null);
        navigate("/")
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  const logout = () => {
    signOut(auth)
      .then(() => {
        setUser(null);
        setError(null);
        navigate("/login");
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <AuthenticationContext.Provider
      value={{ user, login, logout, register, error }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};
