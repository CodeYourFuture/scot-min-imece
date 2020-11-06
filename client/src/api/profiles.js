import React, { useState, useEffect } from "react";
import "semantic-ui-css/semantic.min.css";
import { Table } from "semantic-ui-react";
import { getProfiles } from "../api/status";

const Profiles = () => {
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    getProfiles().then(response => {
      setProfiles(response);
    });
  }, []);
  return !profiles.length ? (
    <p>No Profiles!</p>
  ) : (
    <Table celled>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>#</Table.HeaderCell>
          <Table.HeaderCell>Name</Table.HeaderCell>
          <Table.HeaderCell>Phone</Table.HeaderCell>
          <Table.HeaderCell>Email</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {profiles.map(profile => (
          <Table.Row key={profile.id}>
            <Table.Cell children={profile.id}></Table.Cell>
            <Table.Cell
              children={profile.first_name + " " + profile.last_name}
            ></Table.Cell>
            <Table.Cell children={profile.phone_number}></Table.Cell>
            <Table.Cell children={profile.email}></Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};

export default Profiles;
