import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { Button, Form, Grid, Header, Segment } from "semantic-ui-react";
import { loginUser } from "../api/auth";
import "../styles/login.css";

const Login = props => {
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
        props.loginUser();
      })
      .catch(() => {
        setError(true);
      });
  };

  const token = localStorage.getItem("token");

  if (token) {
    <Redirect to="/" />;
  }

  return (
    <Grid textAlign="center" className="login-grid" verticalAlign="middle">
      <Grid.Column>
        <Header as="h2" textAlign="center">
          Log-in to your account
        </Header>
        <Form>
          <Segment stacked>
            <Form.Input
              name="email"
              onChange={handleChange}
              fluid
              icon="user"
              iconPosition="left"
              placeholder="E-mail address"
            />
            <Form.Input
              name="password"
              onChange={handleChange}
              fluid
              icon="lock"
              iconPosition="left"
              placeholder="Password"
              type="password"
            />
            <Button onClick={signIn} color="teal" fluid size="large">
              Login
            </Button>
            {error ? (
              <div>The login details are not correct. Please try again</div>
            ) : null}
          </Segment>
        </Form>
      </Grid.Column>
    </Grid>
  );
};

export default Login;
