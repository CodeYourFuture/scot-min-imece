import React from "react";
import "../styles/Footer.css";
import CYFLogo from "../assets/CYF.jpeg";
import { Divider, Grid, Image, Segment } from "semantic-ui-react";

const Footer = () => {
  return (
    <div className="footer">
      <Grid divided columns={3}>
        <Grid.Column>
          {" "}
          <div className="team-container">
            <p>Min-Imece-Team</p>
            <span>Samuel</span>
            <span>Hacer</span>
            <span>Fatma</span>
            <span>Mawaddah</span>
            <span>Natalia</span>
          </div>
        </Grid.Column>
        <Grid.Column>
          <h3>
            Migrants' Questions and Answers is an open source project, created
            by CodeYourFuture students. Many thanks to Samuel Odudare for the
            logo
          </h3>
        </Grid.Column>
        <Grid.Column>
          <img class="footer-image" src={CYFLogo} alt="CYFLogo" />
        </Grid.Column>
      </Grid>
    </div>
  );
};

export default Footer;
