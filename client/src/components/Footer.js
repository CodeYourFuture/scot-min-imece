import React from "react";
import CYFLogo from "../assets/CYF.jpeg";
import {
  Container,
  Grid,
  Image,
  Segment,
  List,
  Header
} from "semantic-ui-react";

const Footer = () => {
  return (
    <Segment inverted textAlign="center">
      <Container>
        <Grid divided columns={3}>
          <Grid.Column width={4}>
            <Header inverted as="h4" content="Min-Imece-Team" />
            <List link inverted>
              <List.Item>Samuel</List.Item>
              <List.Item>Natalia</List.Item>
              <List.Item>Mawaddah</List.Item>
              <List.Item>Fatma</List.Item>
              <List.Item>Hacer</List.Item>
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
            />
          </Grid.Column>
        </Grid>
      </Container>
    </Segment>
  );
};

export default Footer;
