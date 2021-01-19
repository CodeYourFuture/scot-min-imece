import React from "react";
import CYFLogo from "../assets/cyf_brand.png";
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
    <Segment
      textAlign="center"
      style={{ backgroundColor: "#F7F083", fontSize: "16px", border: "none" }}
    >
      <Container fluid>
        <Grid columns={3}>
          <Grid.Column width={4}>
            <Header
              as="h4"
              content="Developers"
              style={{ color: "#000", fontSize: "large" }}
            />
            <List>
              <List.Item>Samuel | Natalia | Mawaddah </List.Item>
              <List.Item>Fatma | Hacer</List.Item>
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
              size="medium"
              href="https://codeyourfuture.io"
            />
          </Grid.Column>
        </Grid>
      </Container>
    </Segment>
  );
};

export default Footer;
