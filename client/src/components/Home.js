import React from "react";
import Profiles from "../components/Profiles";
import { Container, Header } from "semantic-ui-react";

const Home = () => {
  return (
    <Container text style={{ marginTop: "20px" }}>
      <Header as="h1">Dashboard</Header>
      <Profiles />
    </Container>
  );
};

export default Home;
