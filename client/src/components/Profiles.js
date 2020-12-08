import React, { useState, useEffect } from "react";
import {
  Message,
  Search,
  Table,
  Button,
  Grid,
  Dropdown
} from "semantic-ui-react";
import { Link } from "react-router-dom";
import { getProfiles, getNationalities, getGroups } from "../api/profiles";

const Profiles = () => {
  const [profiles, setProfiles] = useState([]);
  const [nationalities, setNationalities] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [selectDropdown, setSelectDropdown] = useState([]);
  const [groups, setGroups] = useState([]);
  const [selectedGroupsId, setSelectedGroupsId] = useState([]);

  const handleSearchChange = event => {
    setSearchInput(event.target.value);
  };
  const handleOnChange = (e, data) => {
    setSelectDropdown(data.value);
  };
  const handleOnGroupChange = (e, data) => {
    setSelectedGroupsId(data.value);
  };

  useEffect(() => {
    getProfiles().then(response => {
      setProfiles(response);
    });
    getNationalities().then(response => {
      setNationalities(response);
    });
    getGroups().then(response => {
      setGroups(response);
    });
  }, []);

  const nationality_options = nationalities.map(national => ({
    key: national.id,
    text: national.nationality,
    value: national.id
  }));
  const group_options = groups.map(group => ({
    key: group.id,
    text: group.group_name,
    value: group.id
  }));

  const searchString = searchInput.toLowerCase();
  const isMatch = field => field.toLowerCase().includes(searchString);

  let filteredProfiles = profiles;
  if (selectDropdown.length > 0) {
    filteredProfiles = filteredProfiles.filter(profile =>
      selectDropdown.includes(profile.nationality_id)
    );
  }

  if (selectedGroupsId.length > 0) {
    let selectedGroups = groups.filter(group =>
      selectedGroupsId.includes(group.id)
    );
    let groupMembers = [];
    selectedGroups.forEach(group => {
      groupMembers = groupMembers.concat(group.members);
    });
    filteredProfiles = filteredProfiles.filter(profile =>
      groupMembers.includes(profile.id)
    );
  }

  filteredProfiles = filteredProfiles.filter(
    profile =>
      isMatch(profile.first_name) ||
      isMatch(profile.last_name) ||
      isMatch(profile.email) ||
      (profile.address && isMatch(profile.address)) ||
      (profile.phone_number && isMatch(profile.phone_number)) ||
      (profile.occupation && isMatch(profile.occupation))(
        profile.group_id && isMatch(profile.group_id)
      )
  );
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
            options={nationality_options}
            onChange={handleOnChange}
            placeholder="Nationality"
          />
        </Grid.Column>
        <Grid.Column>
          <Dropdown
            selection
            search
            multiple
            options={group_options}
            onChange={handleOnGroupChange}
            placeholder="Groups"
          />
        </Grid.Column>
      </Grid>
      {filteredProfiles.length === 0 ? (
        <Message>No matching profiles found</Message>
      ) : (
        <Table celled collapsing>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Phone</Table.HeaderCell>
              <Table.HeaderCell>Email</Table.HeaderCell>
              <Table.HeaderCell>Occupation</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {filteredProfiles.map(profile => (
              <Table.Row>
                <Table.Cell
                  children={`${profile.first_name} ${profile.last_name}`}
                ></Table.Cell>
                <Table.Cell children={profile.phone_number}></Table.Cell>
                <Table.Cell children={profile.email}></Table.Cell>
                <Table.Cell children={profile.occupation}></Table.Cell>
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
