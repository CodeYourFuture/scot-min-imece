import React, { useState } from "react";
import "semantic-ui-css/semantic.min.css";
import { loginUser } from "../api/auth";

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
    loginUser(email, password)
      .then(data => {
        const token = data.token;

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
        <form class="ui form">
          <div class="field">
            <label>Email</label>
            <input
              onChange={handleChange}
              name="email"
              type="email"
              placeholder="Example@email.com"
            />
          </div>
          <div class="field">
            <label>Password</label>
            <input
              onChange={handleChange}
              name="password"
              type="password"
              placeholder=" Enter password"
            />
          </div>
          <button onClick={signIn} class="ui button">
            Sign in
          </button>
          {error ? (
            <div>The login details are not correct. Please try again</div>
          ) : null}
        </form>
      </div>
    );
};

export default Login;
