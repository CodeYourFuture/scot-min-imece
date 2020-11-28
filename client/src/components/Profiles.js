import React, { useState, useEffect } from "react";
import {
  Message,
  Search,
  Table,
  Button,
  Grid,
  Dropdown,
  Input,
  Container
} from "semantic-ui-react";
import { Link } from "react-router-dom";
import { getProfiles, getNationalities } from "../api/profiles";

const Profiles = () => {
  const [profiles, setProfiles] = useState([]);
  const [nationality, setNationality] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [selectDropdown, setSelectDropdown] = useState([]);

  const handleSearchChange = event => {
    setSearchInput(event.target.value);
  };
  const handleOnChange = (e, data) => {
    setSelectDropdown(data.value);
  };

  useEffect(() => {
    getProfiles().then(response => {
      setProfiles(response);
    });
    getNationalities().then(response => {
      setNationality(response);
    });
  }, []);

  const options = nationality.map(national => ({
    key: national.id,
    text: `${national.id} -${national.nationality} `,
    value: national.id
  }));

  const searchString = searchInput.toLowerCase();
  const isMatch = field => field.toLowerCase().includes(searchString);

  let filterProfiles = () => {
    return selectDropdown.length === 0
      ? profiles.filter(
          profile =>
            isMatch(profile.first_name) ||
            isMatch(profile.last_name) ||
            isMatch(profile.email) ||
            (profile.address && isMatch(profile.address)) ||
            (profile.phone_number && isMatch(profile.phone_number)) ||
            (profile.occupation && isMatch(profile.occupation))
        )
      : profiles.filter(profile =>
          selectDropdown.includes(profile.nationality_id)
        );
  };

  let filteredProfiles = filterProfiles();

  return (
    <>
      <Grid style={{ margin: "30px 0" }} columns={2}>
        <Grid.Column width={6} style={{ paddingLeft: "0" }}>
          <Search
            onSearchChange={handleSearchChange}
            value={searchInput}
            showNoResults={false}
          />
        </Grid.Column>
        <Grid.Column>
          <Dropdown
            button
            labeled
            icon="world"
            className="icon"
            selection
            search
            multiple
            options={options}
            onChange={handleOnChange}
            placeholder="Nationality"
          />
        </Grid.Column>
      </Grid>
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
              <Table.HeaderCell>Occupation</Table.HeaderCell>
              <Table.HeaderCell>Nationality</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {filteredProfiles.map(profile => (
              <Table.Row key={profile.id}>
                <Table.Cell children={profile.id}></Table.Cell>
                <Table.Cell
                  children={`${profile.first_name} ${profile.last_name}`}
                ></Table.Cell>
                <Table.Cell children={profile.phone_number}></Table.Cell>
                <Table.Cell children={profile.email}></Table.Cell>
                <Table.Cell children={profile.occupation}></Table.Cell>
                <Table.Cell children={profile.nationality_id}></Table.Cell>
                <Table.Cell>
                  <Button
                    as={Link}
                    to={`/profiles/${profile.id}`}
                    size="mini"
                    basic
                    color="black"
                  >
                    View
                  </Button>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      )}
    </>
  );
};

export default Profiles;
