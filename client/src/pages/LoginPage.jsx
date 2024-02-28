//Taylor Zweigle, 2024
import React, { useState } from "react";

import { useLogin } from "../hooks/useLogin";

import Button from "../core/button/Button";
import Card from "../core/card/Card";
import TextInput from "../core/textInput/TextInput";
import Typography from "../core/typography/Typography";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login, error, loading } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await login(email, password);
  };

  return (
    <div className="flex justify-center items-center w-full h-full">
      <div className="w-128">
        <form onSubmit={handleSubmit}>
          <Card border>
            <div className="flex flex-col gap-4 p-8">
              <Typography variant="heading">Login</Typography>
              <TextInput label="Email" type="email" onChange={(e) => setEmail(e.target.value)} value={email} />
              <TextInput label="Password" type="password" onChange={(e) => setPassword(e.target.value)} value={password} />
              <Button disabled={loading}>Login</Button>
              {error && <Typography color="text-rose-500">{error}</Typography>}
            </div>
          </Card>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
