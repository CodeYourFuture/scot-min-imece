import React, { useState, useEffect } from "react";
import { Container, Message, Search, Table } from "semantic-ui-react";
import { getProfiles } from "../api/profiles";

const Profiles = () => {
  const [profiles, setProfiles] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  const handleSearchChange = event => {
    setSearchInput(event.target.value);
  };

  useEffect(() => {
    getProfiles().then(response => {
      setProfiles(response);
    });
  }, []);

  const searchString = searchInput.toLowerCase();
  const isMatch = field => field.toLowerCase().includes(searchString);

  let filteredProfiles = profiles.filter(
    profile =>
      isMatch(profile.first_name) ||
      isMatch(profile.last_name) ||
      isMatch(profile.email) ||
      (profile.address && isMatch(profile.address)) ||
      (profile.phone_number && isMatch(profile.phone_number)) ||
      (profile.occupation && isMatch(profile.occupation))
  );

  return (
    <Container text>
      <Search
        style={{ margin: "30px 0px" }}
        onSearchChange={handleSearchChange}
        value={searchInput}
        showNoResults={false}
      />
      {filteredProfiles.length === 0 ? (
        <Message>No matching profiles found</Message>
      ) : (
        <Table celled collapsing>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>#</Table.HeaderCell>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Phone</Table.HeaderCell>
              <Table.HeaderCell>Email</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {filteredProfiles.map(profile => (
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
      )}
    </Container>
  );
};

export default Profiles;
