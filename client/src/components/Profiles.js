import React, { useState, useEffect } from "react";
import { Container, Message, Search, Table, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { getProfiles } from "../api/profiles";

const Profiles = () => {
  const [profiles, setProfiles] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  const handleSearchChange = event => {
    setSearchInput(event.target.value);
  };

  useEffect(() => {
    getProfiles().then(response => {
      setProfiles(() => {
        return !searchInput
          ? response
          : response.filter(
              profile =>
                profile.first_name
                  .toLowerCase()
                  .includes(searchInput.toLowerCase()) ||
                profile.last_name
                  .toLowerCase()
                  .includes(searchInput.toLowerCase()) ||
                profile.email
                  .toLowerCase()
                  .includes(searchInput.toLowerCase()) ||
                (profile.address &&
                  profile.address
                    .toLowerCase()
                    .includes(searchInput.toLowerCase())) ||
                (profile.phone_number &&
                  profile.phone_number
                    .toLowerCase()
                    .includes(searchInput.toLowerCase())) ||
                (profile.occupation &&
                  profile.occupation
                    .toLowerCase()
                    .includes(searchInput.toLowerCase()))
            );
      });
    });
  }, [searchInput]);

  return (
    <Container text>
      <Search
        style={{ margin: "30px 0px" }}
        onSearchChange={handleSearchChange}
        value={searchInput}
        showNoResults={false}
      />
      {profiles.length === 0 ? (
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
            {profiles.map(profile => (
              <Table.Row key={profile.id}>
                <Table.Cell children={profile.id}></Table.Cell>
                <Table.Cell
                  children={profile.first_name + " " + profile.last_name}
                ></Table.Cell>
                <Table.Cell children={profile.phone_number}></Table.Cell>
                <Table.Cell children={profile.email}></Table.Cell>
                <Table.Cell>
                  {" "}
                  <Button
                    as={Link}
                    to={`/profiles/${profile.id}`}
                    size="mini"
                    basic
                    color="black"
                  >
                    View
                  </Button>{" "}
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      )}
    </Container>
  );
};

export default Profiles;
