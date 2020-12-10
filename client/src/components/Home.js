import React from "react";
import Profiles from "../components/Profiles";
import { Container, Header } from "semantic-ui-react";

const Home = props => {
  return (
    <>
      <Header as="h1">Dashboard</Header>
      {props.isLoggedIn ? (
        <Profiles />
      ) : (
        "You need to login to view the dashboard"
      )}
    </>
  );
};

export default Home;
