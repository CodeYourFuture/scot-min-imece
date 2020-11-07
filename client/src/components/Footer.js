import React from "react";
import "../styles/Footer.css";
import CYFLogo from "../assets/CYF.jpeg";
import { Divider, Grid, Image, Segment } from "semantic-ui-react";

const Footer = () => {
  return (
    <div className="footer">
      <Grid divided columns={3}>
        <Grid.Column>
          <div className="team-container">
            <h3>Min-Imece-Team</h3>
            <span>Samuel</span>
            <span>Hacer</span>
            <span>Fatma</span>
            <span>Mawaddah</span>
            <span>Natalia</span>
          </div>
        </Grid.Column>
        <Grid.Column>
          <p>
            A dashboard for Maryhill Integration Network that staff can use to
            better track, and support service users and volunteers created by
            CodeYourFuture Students
          </p>
        </Grid.Column>
        <Grid.Column>
          <img class="footer-image" src={CYFLogo} alt="CYFLogo" />
        </Grid.Column>
      </Grid>
    </div>
  );
};

export default Footer;
