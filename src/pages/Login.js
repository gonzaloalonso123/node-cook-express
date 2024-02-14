import React, { useContext, useEffect, useState } from "react";
import { Button, Input } from "../components/Generics";
import { AuthenticationContext } from "../providers/AuthenticationProvider";
import { useNavigate } from "react-router-dom";
import { ColorIcon } from "../components/icons/Icon";

export const Login = () => {
  const { login, register, error, user } = useContext(AuthenticationContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const signIn = (e) => {
    e.preventDefault();
    login(email, password);
  };

  const signUp = () => {
    register(email, password);
  };

  useEffect(() => {}, [user, navigate]);

  return (
    <form className="flex w-full items-center justify-center h-screen">
      <div className="flex flex-col w-96 gap-6 mx-auto">
        <div className={`flex flex-col`}>
          <div className="flex gap-2 items-center">
            <ColorIcon color="FFBB64" fontSize="30px">
              account_circle
            </ColorIcon>
            <h1 className="text-3xl font-bold">Login</h1>
          </div>
          <h2 className="text-xl font-bold text-nc-dark-orange">
            Log in or sign up to access your account
          </h2>
        </div>
        <Input
          type="text"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="flex justify-between mt-10 w-full">
          <Button secondary big onClick={signUp} type="button">
            Register
          </Button>
          <Button big type="submit" onClick={signIn}>
            Login
          </Button>
        </div>
        {error && <p className="text-red-500">{error}</p>}
      </div>
    </form>
  );
};
