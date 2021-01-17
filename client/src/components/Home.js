import React from "react";
import Profiles from "../components/Profiles";
import Login from "../components/Login";
import { Header } from "semantic-ui-react";

const Home = props => {
  return (
    <>
      {props.isLoggedIn ? (
        <>
          <Header as="h1">Dashboard</Header>
          <Profiles />
        </>
      ) : (
        <Login loginUser={props.loginUser} />
      )}
    </>
  );
};

export default Home;
