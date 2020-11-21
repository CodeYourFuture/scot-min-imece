import React from "react";
import "../styles/Footer.css";
import CYFLogo from "../assets/CYF.jpeg";
import {
  Container,
  Grid,
  Image,
  Segment,
  List,
  Header,
  Divider
} from "semantic-ui-react";

const Footer = () => {
  return (
    <Segment className="footer" inverted vertical textAlign="center">
      <Container textAlign="center">
        <Grid divided columns={3}>
          <Grid.Column width={4}>
            <Header inverted as="h4" content="Min-Imece-Team" />
            <List link inverted>
              <List.Item as="a">Samuel</List.Item>
              <List.Item as="a">Natalia</List.Item>
              <List.Item as="a">Mawaddah</List.Item>
              <List.Item as="a">Fatma</List.Item>
              <List.Item as="a">Hacer</List.Item>
            </List>
          </Grid.Column>
          <Grid.Column width={8}>
            <p>
              A dashboard for Maryhill Integration Network that staff can use to
              better track, and support service users and volunteers created by
              CodeYourFuture Students
            </p>
          </Grid.Column>
          <Grid.Column width={4}>
            <Image
              src={CYFLogo}
              as="a"
              size="tiny"
              href="https://codeyourfuture.io"
              target="CYF"
            />
          </Grid.Column>
        </Grid>
      </Container>
    </Segment>
  );
};

export default Footer;
