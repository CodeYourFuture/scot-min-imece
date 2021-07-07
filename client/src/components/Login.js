import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { loginUser } from "../api/auth";

const Login = props => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const handleChange = event => {
    if (event.target.name === "email") {
      setEmail(event.target.value);
    }
    if (event.target.name === "password") {
      setPassword(event.target.value);
    }
  };

  const signIn = event => {
    event.preventDefault();
    loginUser(email, password)
      .then(data => {
        if (data.token) {
          localStorage.setItem("token", data.token);
          localStorage.setItem("user", JSON.stringify(data.user));
          props.loginUser();
        } else {
          setErrorMessage(
            "The login details are not correct. Please try again"
          );
        }
      })
      .catch(e => {
        setErrorMessage("Something went wrong. Please try again later");
      });
  };

  const token = localStorage.getItem("token");

  if (token) {
    <Redirect to="/" />;
  }

  return (
    <div className="flex flex-col justify-center items-center max-w-lg mx-auto">
      <div className="sm:mb-24 md:p-20 md:rounded-lg md:shadow-lg">
        <h1 className="text-2xl mb-5 text-gray-800">Log-in to your account</h1>
        <form onSubmit={signIn}>
          <div className="grid grid-cols-1 gap-6">
            <label className="block">
              <span className="text-lg text-gray-700">Email</span>
              <input
                type="email"
                name="email"
                onChange={handleChange}
                placeholder="E-mail address"
                className="form-input mt-1 w-full rounded-md border-gray-300"
              />
            </label>
            <label className="block">
              <span className="text-lg text-gray-700">Password</span>
              <input
                name="password"
                onChange={handleChange}
                placeholder="Password"
                type="password"
                className="form-input mt-1 w-full rounded-md border-gray-300"
              />
            </label>
            <button className="btn px-5 py-3 mt-1 w-full">Login</button>
            <div>{errorMessage}</div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
