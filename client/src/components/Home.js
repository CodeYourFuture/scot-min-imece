import React from "react";
import Profiles from "../components/Profiles";
import { Container, Header } from "semantic-ui-react";

const Home = () => {
  return (
    <>
      <Header as="h1">Dashboard</Header>
      <Profiles />
    </>
  );
};

export default Home;
