import React, { useState } from "react";
import { signApi } from "../api/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const handleChange = event => {
    if (event.target.name === "email") {
      setEmail(event.target.value);
    }
    if (event.target.name === "password") {
      setPassword(event.target.value);
    }
  };
  const signIn = () => {
    signApi(email, password)
      .then(data => {
        const token = data.token;
        console.log(token);

        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(data.user));
        document.location.reload();
      })
      .catch(() => {
        setError(true);
      });
  };
  const token = localStorage.getItem("token");
  if (token) {
    return <div>You are already logged in.</div>;
  } else
    return (
      <div>
        Login
        <input
          onChange={handleChange}
          name="email"
          type="email"
          placeholder="email"
        />
        <input
          onChange={handleChange}
          name="password"
          type="password"
          placeholder="password"
        />
        <button onClick={signIn}>Sign in</button>
        {error ? <div>Wrong information. Try again</div> : null}
      </div>
    );
};

export default Login;
