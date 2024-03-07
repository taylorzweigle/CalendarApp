//Taylor Zweigle, 2024
import React, { useState } from "react";

import { useLogin } from "../hooks/useLogin";

import Button from "../core/button/Button";
import Card from "../core/card/Card";
import TextInput from "../core/textInput/TextInput";
import Typography from "../core/typography/Typography";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { login, error, loading } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await login(username, password);
  };

  return (
    <div className="flex w-full h-full">
      <div className="w-128 p-4 sm:p-8 m-auto">
        <form onSubmit={handleSubmit}>
          <Card border>
            <div className="flex flex-col gap-8 p-4 sm:p-8">
              <div className="flex flex-col gap-4">
                <Typography variant="heading">Calendar App</Typography>
                <TextInput label="Username" type="text" onChange={(e) => setUsername(e.target.value)} value={username} />
                <TextInput label="Password" type="password" onChange={(e) => setPassword(e.target.value)} value={password} />
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
