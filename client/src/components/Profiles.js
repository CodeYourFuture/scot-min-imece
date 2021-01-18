import React, { useState, useEffect } from "react";
import {
  Message,
  Search,
  Table,
  Button,
  Grid,
  Dropdown,
  Segment,
  Label,
  Divider,
  Header
} from "semantic-ui-react";
import { Link, useHistory } from "react-router-dom";
import { getProfiles, getNationalities, getGroups } from "../api/profiles";
import "../styles/dashboard.css";

const Profiles = () => {
  const [profiles, setProfiles] = useState([]);
  const [nationalities, setNationalities] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [selectDropdown, setSelectDropdown] = useState([]);
  const [groups, setGroups] = useState([]);
  const [selectedGroupsId, setSelectedGroupsId] = useState([]);
  let history = useHistory();

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
      (profile.occupation && isMatch(profile.occupation))
  );

  const getClassNames = status => {
    let color;
    if (status === "new") {
      color = "new";
    } else if (status === "active") {
      color = "purples";
    } else color = "reds";
    return color;
  };
  const getProfilesGroups = profileId => {
    let profileGroupsNames = [];
    let filteredGroups = groups.filter(group => group.members.length > 0);
    filteredGroups.map(group =>
      group.members.filter(member => {
        if (member === profileId) {
          profileGroupsNames.push(group.group_name);
        }
        return profileGroupsNames;
      })
    );
    return profileGroupsNames;
  };

  let totalNewProfiles = 0;
  let totalActiveProfiles = 0;
  let totalInactiveProfiles = 0;
  let totalVolunteerProfiles = 0;

  profiles.forEach(profile => {
    if (profile.status === "new") totalNewProfiles++;
    if (profile.status === "active") totalActiveProfiles++;
    if (profile.status === "inactive") totalInactiveProfiles++;
    if (profile.type === "volunteer") totalVolunteerProfiles++;
  });

  return (
    <>
      <Segment className="dashboard-segment">
        <Grid className="dashboard-grid">
          <Grid.Row columns="equal" className="first-row">
            <Grid.Column>
              <Button
                as={Link}
                to="/add-new-profile"
                icon="plus circle"
                labelPosition="right"
                size="medium"
                content="New Profile"
                className="new"
              />
            </Grid.Column>
            <Grid.Column textAlign="right">
              <Button
                icon="setting"
                labelPosition="right"
                content="Settings"
                className="reds"
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row className="search-filter">
            <Grid.Column width={3}>
              <Header
                as="h3"
                content="Service Users"
                style={{ marginTop: "5px" }}
                floated="left"
              />
            </Grid.Column>
            <Grid.Column width={5}>
              <Search
                onSearchChange={handleSearchChange}
                value={searchInput}
                showNoResults={false}
              />
            </Grid.Column>
            <Grid.Column width={5}>
              <Dropdown
                style={{ backgroundColor: " #aad6e4" }}
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
                className="blues"
                button
                selection
                search
                multiple
                options={group_options}
                onChange={handleOnGroupChange}
                placeholder="Groups"
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            {filteredProfiles.length === 0 ? (
              <Message>No matching profiles found</Message>
            ) : (
              <Table sortable selectable celled>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>Name</Table.HeaderCell>
                    <Table.HeaderCell>Last Name</Table.HeaderCell>
                    <Table.HeaderCell>Phone</Table.HeaderCell>
                    <Table.HeaderCell>Email</Table.HeaderCell>
                    <Table.HeaderCell>Group</Table.HeaderCell>
                    <Table.HeaderCell>Volunteer</Table.HeaderCell>
                    <Table.HeaderCell>Status</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {filteredProfiles.map(profile => (
                    <Table.Row
                      onClick={() => history.push(`/profiles/${profile.id}`)}
                    >
                      <Table.Cell
                        children={`${profile.first_name}`}
                      ></Table.Cell>
                      <Table.Cell
                        children={`${profile.last_name}`}
                      ></Table.Cell>
                      <Table.Cell children={profile.phone_number}></Table.Cell>
                      <Table.Cell children={profile.email}></Table.Cell>
                      <Table.Cell
                        children={getProfilesGroups(profile.id).join(", ")}
                      ></Table.Cell>
                      <Table.Cell
                        children={profile.type === "volunteer" ? "Yes" : "No"}
                      ></Table.Cell>
                      <Table.Cell>
                        <Button
                          style={{ minWidth: "92px" }}
                          className={getClassNames(profile.status)}
                        >
                          {profile.status}
                        </Button>
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
            )}
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <Header as="h3" content="This month" floated="left" />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns="equal" textAlign="center" className="last-row">
            <Grid.Column>
              <Label>{totalNewProfiles}</Label>
              <Header as="h4" content="Total of New People" />
              <Divider className="new" />
            </Grid.Column>
            <Grid.Column>
              <Label>{totalActiveProfiles}</Label>
              <Header as="h4" content="Total of Active People" />
              <Divider className="purples" />
            </Grid.Column>
            <Grid.Column>
              <Label>{totalInactiveProfiles}</Label>
              <Header as="h4" content="Total of Inactive People" />
              <Divider className="reds" />
            </Grid.Column>
            <Grid.Column>
              <Label>{totalVolunteerProfiles}</Label>
              <Header as="h4" content="Total of Volunteers" />
              <Divider className="blues" />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    </>
  );
};

export default Profiles;
