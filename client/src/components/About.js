import React from "react";
import { Header, Container } from "semantic-ui-react";

const About = () => {
  return (
    <>
      <Header as="h1">About</Header>
      <p>
        A dashboard for Maryhill Integration Network that staff can use to
        better track, and support service users and volunteers. This includes a
        function for staff to add and edit profiles of individuals to an
        accessible database that can be searched through by filterable fields.
        As well as a function to contact individuals through the dashboard and
        create reports based on data.
      </p>
      <p>
        Maryhill Integration Network (MIN) SCIO was established in 2001 and
        became a registered charity (SCO37300) in March 2006. We are a Scottish
        Charitable Incorporated Organisation . We have a voluntary Board of
        Trustees.
      </p>
      <p>
        MIN brings refugee, migrant and local communities together through, art,
        social, cultural and educational groups and projects, offering people a
        chance to learn new skills, meet new people, share experiences and take
        part in worthwhile activities to improve their lives and the life of
        their communities.
      </p>
    </>
  );
};

export default About;
