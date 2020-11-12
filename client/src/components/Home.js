import React from "react";
import "../styles/Home.css";
import Profiles from "../components/Profiles";
import { Container, Header } from "semantic-ui-react";

const Home = () => {
  return (
    <Container text style={{ marginTop: "20px" }}>
      <Header as="h1">MIN - Imece</Header>
      <Profiles />
    </Container>
  );
};

export default Home;
