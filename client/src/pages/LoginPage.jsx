//Taylor Zweigle, 2024
import React, { useState } from "react";

import { useLogin } from "../hooks/useLogin";

import Button from "../core/button/Button";
import Card from "../core/card/Card";
import TextInput from "../core/textInput/TextInput";
import Typography from "../core/typography/Typography";

import logo from "../img/Logo.svg";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { login, error, loading } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await login(username, password);
  };

  return (
    <div className="h-screen bg-slate-200 dark:bg-slate-950">
      <div className="w-full sm:w-128 p-4 sm:p-8 m-auto">
        <form onSubmit={handleSubmit}>
          <Card border>
            <div className="flex flex-col justify-between sm:gap-8 h-[calc(100vh-112px)] sm:h-fit p-4 sm:p-8">
              <div className="flex flex-col items-center gap-4">
                <div className="flex flex-col gap-0">
                  <img src={logo} alt="logo" width="128" height="128" />
                  <Typography variant="heading">Calendar App</Typography>
                </div>
                <TextInput
                  label="Username"
                  showLabel
                  type="text"
                  onChange={(e) => setUsername(e.target.value)}
                  value={username}
                />
                <TextInput
                  label="Password"
                  showLabel
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                />
                {error && <Typography color="text-rose-500">{error}</Typography>}
              </div>
              <Button variant="primary" disabled={loading}>
                Login
              </Button>
            </div>
          </Card>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
